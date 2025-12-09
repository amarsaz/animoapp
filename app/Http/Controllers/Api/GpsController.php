<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DeviceLocation;
use App\Models\Geofence;
use Illuminate\Support\Facades\Log;


class GpsController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'device_id' => 'required|string',
            'lat'       => 'required|numeric',
            'lng'       => 'required|numeric',
        ]);

        // Save GPS location
        $location = DeviceLocation::create([
            'device_id' => $data['device_id'],
            'lat'       => $data['lat'],
            'lng'       => $data['lng'],
        ]);

        // Check geofence (if exists)
        $geofence = Geofence::where('device_id', $data['device_id'])->first();

        $status = 'no_geofence';
        $distance = null;

        if ($geofence) {
            $distance = $this->haversine(
                $data['lat'],
                $data['lng'],
                $geofence->center_lat,
                $geofence->center_lng
            );

           $status = ($distance <= $geofence->radius_m) ? 'inside' : 'outside';

            // ✅ Get previous location (for REAL transition detection)
            $last = DeviceLocation::where('device_id', $data['device_id'])
                ->latest()
                ->first();

            $shouldAlert = false;

            if ($last && $last->status === 'inside' && $status === 'outside') {
            $shouldAlert = true;
            }

            // ✅ Save new GPS status
            $location->status = $status;
            $location->distance_m = round($distance, 2);
            $location->save();

            // ✅ REAL GEOFENCE ALERT (NO SPAM)
            $shouldAlert = false;

            // Trigger only when device exits the safe zone
            if ($status === 'outside') {
            $shouldAlert = true;
            }

            if ($shouldAlert) {
            Log::alert("🚨 GEOFENCE BREACH: {$data['device_id']} exited the safe zone!");
            }


        }

        return response()->json([
            'success'     => true,
            'device_id'  => $data['device_id'],
            'latitude'   => $data['lat'],
            'longitude'  => $data['lng'],
            'distance_m' => $distance,
            'status'     => $status,
        ]);
    }

    // ✅ Haversine Formula (distance in meters)
    private function haversine($lat1, $lng1, $lat2, $lng2)
    {
        $earthRadius = 6371000;

        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLng / 2) * sin($dLng / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }
}
