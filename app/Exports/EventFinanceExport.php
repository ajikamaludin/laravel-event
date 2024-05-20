<?php

namespace App\Exports;

use App\Models\Event;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class EventFinanceExport implements FromView
{
    public function view(): View
    {
        return view('print.event_finance', ['items' => Event::with(['client', 'report', 'finance'])->get()]);
    }
}
