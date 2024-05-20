<?php

namespace App\Services;

use App\Models\Event;
use App\Models\LogisticReception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class GeneralServices
{
    public static function generateMonths()
    {
        return [
            ['id' => 1, 'name' => 'Januari'],
            ['id' => 2, 'name' => 'Februari'],
            ['id' => 3, 'name' => 'Maret'],
            ['id' => 4, 'name' => 'April'],
            ['id' => 5, 'name' => 'Mei'],
            ['id' => 6, 'name' => 'Juni'],
            ['id' => 7, 'name' => 'Juli'],
            ['id' => 8, 'name' => 'Agustus'],
            ['id' => 9, 'name' => 'September'],
            ['id' => 10, 'name' => 'Oktober'],
            ['id' => 11, 'name' => 'November'],
            ['id' => 12, 'name' => 'Desember'],
        ];
    }

    public static function generateYearEvents()
    {
        if (Event::count() == 0) {
            return ['2024'];
        }

        return Event::select("start_date")
            ->groupBy('start_date')
            ->get()
            ->map(fn ($d) => Carbon::parse($d->start_date)->format('Y'))
            ->unique()
            ->values();
    }

    public static function generateYearLogistics()
    {
        if (LogisticReception::count() == 0) {
            return ['2024'];
        }

        return LogisticReception::select("rdate")
            ->groupBy('rdate')
            ->get()
            ->map(fn ($d) => Carbon::parse($d->rdate)->format('Y'))
            ->unique()
            ->values();
    }
}
