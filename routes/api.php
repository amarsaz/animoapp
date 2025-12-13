<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GpsController;
use App\Http\Controllers\Api\DataVisualizationController;
use App\Http\Controllers\Api\CameraController;

Route::post('/gps', [GpsController::class, 'store']);
Route::get('/data-visualization', [DataVisualizationController::class, 'index']);

Route::post('/camera/detection', [\App\Http\Controllers\Api\CameraController::class, 'store']);
Route::get('/camera/latest', [\App\Http\Controllers\Api\CameraController::class, 'latest']);
