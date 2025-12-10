<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeviceLocation extends Model
{
    protected $fillable = [
        'device_id',
        'lat',
        'lng',
        'status',
        'distance_m'
    ];
}
