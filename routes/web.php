<?php

use App\Http\Controllers\TrackerController;
use App\Models\Tracker;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('welcome');
})->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'tracker' => []
        ]);
    })->name('dashboard');
    // http://127.0.0.1:8000/data-visualization
    Route::get('data-visualization', [TrackerController::class, 'index']);

    Route::get('schedule', function () {
        return Inertia::render('schedule');
    })->name('schedule');

    Route::get('info-detail', function () {
        return Inertia::render('info-detail');
    })->name('info-detail');

    

});

Route::get('/api/tracker', [TrackerController::class, 'index']);
Route::post('/api/tracker', [TrackerController::class, 'store']);
Route::get('/api/tracker/store-dummy', [TrackerController::class, 'storeDummy']);


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
