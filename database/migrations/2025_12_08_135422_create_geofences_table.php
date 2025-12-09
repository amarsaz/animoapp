<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('geofences', function (Blueprint $table) {
        $table->id();
        $table->string('device_id');
        $table->decimal('center_lat', 10, 7);
        $table->decimal('center_lng', 10, 7);
        $table->integer('radius_m'); // meters
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('geofences');
    }
};
