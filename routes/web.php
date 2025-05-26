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
        $tracker = Tracker::orderBy("timestamp", "desc")->get();
        return Inertia::render('dashboard', [
            'tracker' => $tracker
        ]);
    })->name('dashboard');

});

Route::get('/api/tracker', [TrackerController::class, 'index']);
Route::post('/api/tracker', [TrackerController::class, 'store']);
Route::get('/api/tracker/store-dummy', [TrackerController::class, 'storeDummy']);


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
