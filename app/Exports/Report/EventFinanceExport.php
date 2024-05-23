<?php

namespace App\Exports\Report;

use App\Models\Event;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class EventFinanceExport implements FromView
{
    public function view(): View
    {
        return view('print.report.event_finance', ['items' => Event::with(['client', 'type.category', 'finance'])->get()]);
    }
}
