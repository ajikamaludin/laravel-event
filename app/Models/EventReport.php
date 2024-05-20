<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;

class EventReport extends Model
{
    const REPORTED = 1;
    const DRAFT = 0;

    const STATUSES = [
        ['id' => self::DRAFT, 'name' => 'Belum Laporan',],
        ['id' => self::REPORTED, 'name' => 'Sudah Laporan'],
    ];

    protected $fillable = [
        'event_id',
        'rdate',
        'file_finance',
        'file_event',
        'status',
    ];

    protected $appends = ['status_text', 'file_finance_url', 'file_event_url'];

    public function statusText(): Attribute
    {
        return Attribute::make(get: fn () => self::STATUSES[$this->status]['name']);
    }

    public function fileFinanceUrl(): Attribute
    {
        return Attribute::make(get: fn () => $this->file_finance != '' ? route('file.show', ['file' => $this->file_finance]) : null);
    }

    public function fileEventUrl(): Attribute
    {
        return Attribute::make(get: fn () => $this->file_event != '' ? route('file.show', ['file' => $this->file_event]) : null);
    }
}
