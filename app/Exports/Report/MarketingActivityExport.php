<?php

namespace App\Exports\Report;

use App\Models\MarketingActivity;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class MarketingActivityExport implements FromView
{
    public function __construct(public $query)
    {
    }

    public function view(): View
    {
        return view('print.report.marketing_activity', ['items' => $this->query->get()]);
    }
}
