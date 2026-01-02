<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CameraResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'animal' => $this->resource->animal,
            'confidence' => $this->resource->confidence,
            'image_path' => asset('storage/' . $this->resource->image_path),
            'created_at' => $this->resource->created_at,
        ];
    }
}
