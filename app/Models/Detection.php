<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detection extends Model
{
    protected $fillable = [
        'animal',
        'confidence',
        'image_path'
    ];
     

    public function getFullImageUrlAttribute()
    {
        return asset('storage/' . $this->image_path);
    }
}
