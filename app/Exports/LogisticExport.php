<?php

namespace App\Exports;

use App\Models\Logistic;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class LogisticExport implements FromView
{
    public function view(): View
    {
        return view('print.logistic', ['items' => Logistic::with(['category'])->get()]);
    }
}
