<?php

namespace App\Exports;

use App\Models\LogisticReception;
use App\Models\MarketingActivity;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;

class LogisticReceptionExport implements FromView
{
    public function view(): View
    {
        return view('print.logistic_reception', ['items' => LogisticReception::with(['logistic', 'committee'])->get()]);
    }
}
