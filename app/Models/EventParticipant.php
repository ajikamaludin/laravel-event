<?php

namespace App\Models;

class EventParticipant extends Model
{
    protected $fillable = [
        'event_id',
        'participant_id',
    ];

    public function participant()
    {
        return $this->belongsTo(Participant::class, 'participant_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }
}
