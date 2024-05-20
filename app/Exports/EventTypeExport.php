<?php

namespace App\Exports;

use App\Models\EventType;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithHeadings;

class EventTypeExport implements FromView
{
    public function view(): View
    {
        return view('print.event_type', ['items' => EventType::all()]);
    }
}
