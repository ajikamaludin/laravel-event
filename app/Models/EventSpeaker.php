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
}
