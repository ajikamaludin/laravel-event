<?php

namespace App\Models;

class MarketingActivity extends Model
{
    protected $fillable = [
        'category_id',
        'client_id',
        'date',
        'place',
        'committee_id',
        'notes',
    ];

    public function category()
    {
        return $this->belongsTo(MarketingActivityCategory::class, 'category_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function committee()
    {
        return $this->belongsTo(Committe::class, 'committee_id');
    }
}
