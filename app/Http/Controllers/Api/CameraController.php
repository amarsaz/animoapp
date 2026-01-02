<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CameraResources;
use Illuminate\Http\Request;
use App\Models\Detection;
use App\Mail\AnimalDetectedAlert;
use Illuminate\Support\Facades\Mail;

class CameraController extends Controller
{
    /**
     * Store detection from RPi camera
     * POST /api/camera/detection
     */
    public function store(Request $request)
    {
        // ✅ Validate input
        $request->validate([
            'animal'     => 'required|string',
            'confidence' => 'required|numeric',
            'image'      => 'required|image',
        ]);

        // ✅ Store image
        $path = $request->file('image')->store('detections', 'public');

        // ✅ Save detection to database
        $detection = Detection::create([
            'animal'     => strtolower($request->animal),
            'confidence' => $request->confidence,
            'image_path'=> $path,
        ]);

        // 🔥 EMAIL ALERT CONDITIONS
        $alertAnimals = ['tiger', 'elephant', 'orang utan'];
        $minConfidence = 0.70;

        // ⏱ Anti-spam: 5 minutes cooldown
        $recentAlert = Detection::where('animal', $detection->animal)
            ->where('id', '!=', $detection->id)
            ->where('created_at', '>=', now()->subMinutes(5))
            ->exists();


        if (
            in_array($detection->animal, $alertAnimals) &&
            $detection->confidence >= $minConfidence &&
            !$recentAlert
        ) {
            Mail::to(config('mail.from.address'))
                ->queue(new AnimalDetectedAlert($detection));
        }
    }


    /**
     * Get latest detection
     * GET /api/camera/latest
     */
    public function latest()
    {
        $latest = Detection::latest()->first();

        if (!$latest) {
            return response()->json(null);
        }

        return response()->json([
            'animal'     => $latest->animal,
            'confidence' => $latest->confidence,
            'image'      => asset('storage/' . $latest->image_path),
            'timestamp'  => $latest->created_at,
        ]);
    }

    /**
     * Activity level per animal (last 7 days)
     * GET /api/camera/activity-levels
     */
    public function activityLevels()
    {
        $animals = ['tiger', 'elephant', 'orang utan'];
        $result = [];

        foreach ($animals as $animal) {
            $count = Detection::where('animal', $animal)
                ->where('created_at', '>=', now()->subDays(7))
                ->count();

            if ($count <= 2) {
                $level = 'Low';
                $color = 'green';
            } elseif ($count <= 4) {
                $level = 'Medium';
                $color = 'yellow';
            } else {
                $level = 'High';
                $color = 'red';
            }

            $result[$animal] = [
                'count' => $count,
                'level' => $level,
                'color' => $color,
            ];
        }

        return response()->json($result);
    }

    public function history()
    {
        $data = Detection::limit(3)->orderBy('created_at','desc')->get();
        return response()->json(CameraResources::collection($data));
    }

    //https://www.youtube.com/watch?v=cbHWpzBBwLw

}
