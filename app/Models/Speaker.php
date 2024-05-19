<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;

class Speaker extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'address',
        'email',
        'photo',
    ];

    protected $appends = ['photo_url'];

    public function photoUrl(): Attribute
    {
        return Attribute::make(get: fn () => $this->photo != '' ? route('file.show', ['file' => $this->photo]) : null);
    }
}
