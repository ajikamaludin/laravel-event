<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;

class Participant extends Model
{
    protected $fillable = [
        'code',
        'name',
        'phone',
        'address',
        'email',
        'photo',
        'gender',
        'city',
        'dob',
        'job_trust',
        'client_id',
    ];

    protected $appends = ['photo_url'];

    public function photoUrl(): Attribute
    {
        return Attribute::make(get: fn () => $this->photo != '' ? route('file.show', ['file' => $this->photo]) : null);
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function events()
    {
        return $this->hasMany(EventParticipant::class, 'participant_id');
    }
}
