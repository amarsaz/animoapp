<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TrackingGps;

class TrackerController extends Controller
{
    /**
     * Show GPS tracking visualization page.
     */
    public function index()
    {
        // $cars = array("Volvo", "BMW", "Toyota");

        // return $cars;

        // return response()->json([
        //     'animal' => [
        //         [
        //             'id' => 1,
        //             'name' => 'Harimau',
        //         ],
        //         [
        //             'id' => 2,
        //             'name' => 'Biawak',
        //         ],
        //     ],
        //     'user' => [
        //         [
        //             'id' => 1,
        //             'name' => 'Rembo',
        //         ],
        //         [
        //             'id' => 2,
        //             'name' => 'Amar',
        //         ],
        //     ]
        // ]);
        return Inertia::render('data-visualization' , [
            'trackingData' => []
        ]);
    }

    /**
     * Store GPS tracking data coming from Raspberry Pi.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tracking_device_id' => 'required',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
        ]);

        TrackingGps::create([
            'tracking_device_id' => $request->tracking_device_id,
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
            'timestamp' => now(),
        ]);

        return response()->json(['status' => 'success']);
    }

    /**
     * Fetch all GPS tracking data (for the map)
     */
    public function fetch()
    {
        return TrackingGps::orderBy('timestamp', 'desc')->get();
    }
}
