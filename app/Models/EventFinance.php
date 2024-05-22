<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;

class EventFinance extends Model
{
    protected $fillable = [
        'event_id',
        'income',
        'expense',
    ];

    protected $appends = ['profit', 'profit_percent'];

    public function profit(): Attribute
    {
        return Attribute::make(get: fn () => $this->income - $this->expense);
    }

    public function profitPercent(): Attribute
    {
        return Attribute::make(get: fn () => ($this->expense != 0 ? number_format(($this->profit / $this->income) * 100, 2) : 0) . '%');
    }
}
