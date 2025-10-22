<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrackingGps extends Model
{
    protected $fillable = [
        'tracking_device_id',
        'longitude',
        'latitude',
        'timestamp'
    ];
}
