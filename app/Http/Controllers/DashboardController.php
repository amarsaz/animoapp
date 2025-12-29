<?php

namespace App\Http\Controllers;

use App\Http\Resources\LatestDetectionResource;
use App\Models\Detection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $latest = Detection::latest()->first();


        return Inertia::render('dashboard', [
            'tracker' => [],
            'detection' => $latest ? [
                'animal'     => $latest->animal,
                'confidence' => $latest->confidence,
                'image'      => asset('storage/' . $latest->image_path),
                'timestamp'  => $latest->created_at,
            ] : null
        ]);
    }
}
