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

    public function getTimestampAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->timezone('Asia/Kuala_Lumpur')->format('d-m-Y h:i:s A');
    }
}
