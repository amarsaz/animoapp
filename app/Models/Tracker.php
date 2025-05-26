<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tracker extends Model
{
    protected $fillable = [
        'timestamp',
        'longitude',
        'latitude',
        'distance',
        'zone',
    ];

    protected $casts = [
        'timestamp' => 'datetime',
    ];
}
