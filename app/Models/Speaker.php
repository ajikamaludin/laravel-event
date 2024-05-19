<?php

namespace App\Models;

class Speaker extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'address',
        'email',
        'photo',
    ];
}
