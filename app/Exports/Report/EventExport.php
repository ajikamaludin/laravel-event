<?php

namespace App\Exports\Report;

use App\Models\Event;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class EventExport implements FromView
{
    public function __construct(public $query)
    {
    }

    public function view(): View
    {
        return view('print.report.event', ['items' => $this->query->get()]);
    }
}
