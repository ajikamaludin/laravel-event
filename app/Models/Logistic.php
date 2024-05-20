<?php

namespace App\Models;

class Logistic extends Model
{
    protected $fillable = [
        'name',
        'category_id',
        'qty_used',
        'qty_reception',
        'qty_last',
    ];

    public function category()
    {
        return $this->belongsTo(LogisticCategory::class, 'category_id');
    }
}
