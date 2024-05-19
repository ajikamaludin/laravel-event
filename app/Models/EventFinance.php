<?php

namespace App\Models;

class EventFinance extends Model
{
    protected $fillable = [
        'event_id',
        'income',
        'expense',
    ];
}
