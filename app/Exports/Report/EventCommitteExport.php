<?php

namespace App\Exports\Report;

use App\Models\EventCommitte;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class EventCommitteExport implements FromView
{
    public function __construct(public $query)
    {
    }

    public function view(): View
    {
        return view('print.report.event_committe', ['items' => $this->query->get()]);
    }
}
