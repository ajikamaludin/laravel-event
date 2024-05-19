<?php

namespace App\Models;

class LogisticReception extends Model
{
    protected $fillable = [
        'logistic_id',
        'commite_id',
        'rdate',
        'qty',
    ];
}
