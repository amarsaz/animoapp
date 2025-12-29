<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GpsController;
use App\Http\Controllers\Api\DataVisualizationController;
use App\Http\Controllers\Api\CameraController;

Route::get('/', function () {
    return response()->json(['animo' => 'v1']);
});

// GPS routes
Route::prefix('gps')->group(function () {
    Route::get('/coordinate/{id}', [GpsController::class, 'getDeviceLatestCoordinate']);
    Route::post('/update-coordinate', [GpsController::class, 'store']);
});

// CAMERA routes ✅

Route::prefix('camera')->group(function () {
    Route::post('/detection', [CameraController::class, 'store']);
    Route::get('/latest', [CameraController::class, 'latest']);
});
