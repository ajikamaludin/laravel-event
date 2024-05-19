<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;

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

    protected $appends = ['company_logo_url'];

    public function companyLogoUrl(): Attribute
    {
        return Attribute::make(get: fn () => $this->company_logo != '' ? route('file.show', ['file' => $this->company_logo]) : null);
    }
}
