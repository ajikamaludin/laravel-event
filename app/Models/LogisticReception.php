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

    public function logistic()
    {
        return $this->belongsTo(Logistic::class, 'logistic_id');
    }

    public function committee()
    {
        return $this->belongsTo(Committe::class, 'commite_id');
    }
}
