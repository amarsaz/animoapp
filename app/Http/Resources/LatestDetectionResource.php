<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LatestDetectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'animal'     => $this->animal,
            'confidence' => $this->confidence,
            'image'      => asset('storage/' . $this->image_path),
            'timestamp'  => $this->created_at,
        ];
    }
}
