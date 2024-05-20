<?php

namespace App\Models;

class EventLogistic extends Model
{
    protected $fillable = [
        'event_id',
        'logistic_id',
        'qty_used',
    ];

    public function logistic()
    {
        return $this->belongsTo(Logistic::class, 'logistic_id');
    }
}
