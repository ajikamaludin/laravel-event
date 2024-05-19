<?php

namespace App\Models;

class MarketingActivity extends Model
{
    protected $fillable = [
        'category_id',
        'client_id',
        'date',
        'place',
        'pic_name',
        'notes',
    ];
}
