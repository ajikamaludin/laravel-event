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
}
