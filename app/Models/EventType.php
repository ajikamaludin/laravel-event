<?php

namespace App\Models;

class EventType extends Model
{
    protected $fillable = [
        'name',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(EventCategory::class);
    }
}
