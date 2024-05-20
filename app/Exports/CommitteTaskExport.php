<?php

namespace App\Exports;

use App\Models\CommitteTask;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class CommitteTaskExport implements FromView
{
    public function view(): View
    {
        return view('print.committe_task', ['items' => CommitteTask::all()]);
    }
}
