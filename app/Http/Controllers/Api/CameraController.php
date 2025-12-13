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
}
