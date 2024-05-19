<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Setting extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    protected $fillable = [
        'key',
        'value',
        'type',
    ];

    protected $appends = [
        'url',
    ];

    public static function getByKey($key): ?string
    {
        return Setting::where('key', $key)->value('value');
    }

    public static function getByKeyUrl($key): ?string
    {
        return self::getByKey($key) != null ? route('file.show', self::getByKey($key)) : null;
    }

    public function url(): Attribute
    {
        return Attribute::make(get: fn () => $this->type == 'image' && $this->value != '' ? route('file.show', ['file' => $this->value]) : null);
    }
}
