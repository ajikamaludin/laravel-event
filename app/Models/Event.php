<?php

namespace App\Models;

class Event extends Model
{
    protected $fillable = [
        'type_id',
        'client_id',
        'start_date',
        'end_date',
        'name',
        'place',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function report()
    {
        return $this->hasOne(EventReport::class, 'event_id');
    }

    public function speakers()
    {
        return $this->hasMany(EventSpeaker::class, 'event_id');
    }

    public function participants()
    {
        return $this->hasMany(EventParticipant::class, 'event_id');
    }

    public function logistics()
    {
        return $this->hasMany(EventLogistic::class, 'event_id');
    }

    public function committes()
    {
        return $this->hasMany(EventCommitte::class, 'event_id');
    }

    public function finance()
    {
        return $this->hasOne(EventFinance::class, 'event_id');
    }
}
