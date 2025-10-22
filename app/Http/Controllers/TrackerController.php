<?php

namespace App\Http\Controllers;

use App\Models\Tracker;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('data-visualization');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Store a dummy tracker entry.
     */
    public function storeDummy(Request $request)
    {
        // $tracker = Tracker::create([
        //     'timestamp' => now(),
        //     'longitude' => '123.456',
        //     'latitude' => '78.910',
        //     'distance' => 100.00, // Example distance
        //     'zone'  => 'Example Zone',
        // ]);

        // return response()->json([
        //     'message' => 'Dummy tracker entry created successfully.',
        //     'data' => $tracker,
        // ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tracker $tracker)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tracker $tracker)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tracker $tracker)
    {
        //
    }
}
