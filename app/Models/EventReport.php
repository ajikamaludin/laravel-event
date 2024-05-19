<?php

namespace App\Models;

class EventReport extends Model
{
    protected $fillable = [
        'event_id',
        'logistic_id',
        'rdate',
        'file_finance',
        'file_event',
        'status',
    ];
}
