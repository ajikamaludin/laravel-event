<?php

namespace App\Exports;

use App\Models\Logistic;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class LogisticExport implements FromView
{
    public function view(): View
    {
        return view('print.logistic', ['items' => Logistic::with(['category'])->get()]);
    }
}
