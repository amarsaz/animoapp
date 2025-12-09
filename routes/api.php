<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GpsController;
use App\Http\Controllers\Api\DataVisualizationController;

Route::post('/gps', [GpsController::class, 'store']);
Route::get('/data-visualization', [DataVisualizationController::class, 'index']);
