<?php

namespace App\Exports;

use App\Models\Event;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class EventExport implements FromView
{
    public function view(): View
    {
        return view('print.event', ['items' => Event::with(['client', 'report'])->get()]);
    }
}
