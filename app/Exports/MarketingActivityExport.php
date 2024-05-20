<?php

namespace App\Exports;

use App\Models\MarketingActivity;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;

class MarketingActivityExport implements FromView
{
    public function view(): View
    {
        return view('print.marketing_activity', ['items' => MarketingActivity::with(['category', 'client', 'committee'])->get()]);
    }
}
