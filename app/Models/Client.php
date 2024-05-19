<?php

namespace App\Models;

class Client extends Model
{
    protected $fillable = [
        'company_category',
        'company_name',
        'company_address',
        'company_logo',
        'company_phone',
        'pic_name',
        'pic_phone',
    ];
}
