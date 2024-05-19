<?php

namespace App\Models;

class Logistic extends Model
{
    protected $fillable = [
        'name',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(LogisticCategory::class, 'category_id');
    }
}
