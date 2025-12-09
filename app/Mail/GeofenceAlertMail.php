<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GeofenceAlertMail extends Mailable
{
    use Queueable, SerializesModels;

    public $device_id;
    public $lat;
    public $lng;
    public $distance;

    public function __construct($device_id, $lat, $lng, $distance)
    {
        $this->device_id = $device_id;
        $this->lat = $lat;
        $this->lng = $lng;
        $this->distance = $distance;
    }

    public function build()
    {
        return $this->subject('🚨 GEOFENCE BREACH ALERT')
            ->view('emails.geofence-alert');
    }
}
