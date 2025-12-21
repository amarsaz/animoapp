<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GpsController;
use App\Http\Controllers\Api\DataVisualizationController;
use App\Http\Controllers\Api\CameraController;

Route::get('/', function () {
    return response()->json(
        ['animo' => 'v1']
    );
});

// localhost:8000/api/camera/latest
Route::prefix('gps')->group(function() {
    Route::get('/coordinate/{id}', [GpsController::class, 'getDeviceLatestCoordinate']);
    Route::post('/update-coordinate', [GpsController::class, 'store']);
});



// Route::get('/camera/detection', [CameraController::class, 'store']);
// Route::get('/camera/latest', [CameraController::class, 'latest']);

// 2.0222941666666667,15.318534