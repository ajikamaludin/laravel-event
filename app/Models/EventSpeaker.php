<?php

namespace App\Models;

class EventSpeaker extends Model
{
    protected $fillable = [
        'event_id',
        'speaker_id',
        'sdate',
        'title',
    ];

    public function speaker()
    {
        return $this->belongsTo(Speaker::class, 'speaker_id');
    }
}
