<?php

namespace App\Models;

class EventParticipant extends Model
{
    protected $fillable = [
        'event_id',
        'participant_id',
    ];
}
