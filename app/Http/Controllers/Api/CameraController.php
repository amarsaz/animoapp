<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Detection;
use App\Mail\AnimalDetectedAlert;
use Illuminate\Support\Facades\Mail;

class CameraController extends Controller
{
    public function store(Request $request)
    {
        // Validate input
        $request->validate([
            'animal' => 'required|string',
            'confidence' => 'required|numeric',
            'image' => 'required|image',
        ]);

        // Store image
        $path = $request->file('image')->store('detections', 'public');

        // Save detection
        $detection = Detection::create([
            'animal' => strtolower($request->animal),
            'confidence' => $request->confidence,
            'image_path' => $path,
        ]);

        // // Email triggers
        // $alertAnimals = ['tiger', 'elephant', 'orang utan'];

        // if (in_array($detection->animal, $alertAnimals)) {
        //     Mail::to('amarsazx@gmail.com')->send(new AnimalDetectedAlert($detection));
        // }

        return response()->json(['success' => true]);
    }

    public function latest()
    {
        $latest = Detection::orderBy('created_at', 'desc')->first();

        if (!$latest) {
            return response()->json(null);
        }

        return response()->json([
            'animal' => $latest->animal,
            'timestamp' => $latest->created_at,
        ]);
    }

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
}
