<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DeviceLocation;
use Illuminate\Http\Request;

class DataVisualizationController extends Controller
{
    public function index()
    {
        $latestLocations = DeviceLocation::latest()
            ->get()
            ->map(function ($item) {
                return [
                    'deviceId' => $item->device_id,
                    'animalName' => 'Unknown', // or from relation later
                    'latitude' => $item->lat,
                    'longitude' => $item->lng,
                    'status' => $item->status ?? 'Active',
                    'battery' => rand(60, 95) . '%', // temp
                    'signalStrength' => 'Strong',
                    'date' => $item->created_at->format('d M Y'),
                    'time' => $item->created_at->format('h:i A'),
                ];
            });

        return response()->json([
            'trackingData' => $latestLocations,
        ]);
    }
}
