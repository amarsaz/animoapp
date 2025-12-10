<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DeviceLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class DataVisualizationController extends Controller
{
    public function index()
    {
            // ✅ MONTHLY ANIMAL DETECTION STATS (FOR GRAPH)
            $monthlyStats = DB::table('device_locations')
                ->select(
                    DB::raw("DATE_FORMAT(created_at, '%b') as month"),
                    DB::raw("COUNT(*) as count")
                )
                ->groupBy(DB::raw("MONTH(created_at)"), DB::raw("DATE_FORMAT(created_at, '%b')"))
                ->orderBy(DB::raw("MONTH(created_at)"))
                ->get();

            // ✅ LATEST GPS DATA (FOR MAP + TABLE)
            $latestLocations = DeviceLocation::latest()
                ->get()
                ->map(function ($item) {
                    return [
                        'deviceId' => $item->device_id,
                        'animalName' => 'Unknown',
                        'latitude' => $item->lat,
                        'longitude' => $item->lng,
                        'status' => $item->status ?? 'Active',
                        'battery' => rand(60, 95) . '%',
                        'signalStrength' => 'Strong',
                        'date' => $item->created_at->format('d M Y'),
                        'time' => $item->created_at->format('h:i A'),
                    ];
                });

            return response()->json([
                'trackingData' => $latestLocations,
                'monthlyStats' => $monthlyStats
            ]);
    }

}
