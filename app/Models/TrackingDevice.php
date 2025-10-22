<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrackingDevice extends Model
{
    protected $fillable = [
        'type',
        'last_detection'
    ];
}
