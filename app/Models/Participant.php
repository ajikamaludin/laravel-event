<?php

namespace App\Models;

class Participant extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'address',
        'email',
        'photo',
        'gender',
        'city',
        'dob',
    ];
}
