<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrackerCamera extends Model
{
    protected $table = [
        'tracking_id',
        'photo',
        'longitude',
        'latitude',
        'timestamp'
    ];
}
