<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Detection;

class CameraController extends Controller
{
    // RPi5 sends detection HERE
    public function store(Request $request)
    {
        $path = $request->file('image')->store('detections', 'public');

        Detection::create([
            'animal' => $request->animal,
            'confidence' => $request->confidence,
            'image_path' => $path,
        ]);

        return response()->json(['success' => true]);
    }

    // Dashboard fetches latest detection every 2 minutes
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

    // Activity schedule logic (count detections)
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
