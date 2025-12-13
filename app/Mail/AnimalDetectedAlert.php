<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Detection;

class AnimalDetectedAlert extends Mailable
{
    use Queueable, SerializesModels;

    public $detection;

    public function __construct(Detection $detection)
    {
        $this->detection = $detection;
    }

    public function build()
    {
        return $this->subject('⚠️ Animal Detected: ' . ucfirst($this->detection->animal))
            ->markdown('emails.animal-detected')
            ->with([
                'animal' => ucfirst($this->detection->animal),
                'confidence' => round($this->detection->confidence * 100),
                'image' => asset('storage/' . $this->detection->image_path),
                'timestamp' => $this->detection->created_at->format('d M Y h:i A'),
            ]);
    }
}
