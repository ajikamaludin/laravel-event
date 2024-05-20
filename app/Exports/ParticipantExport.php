<?php

namespace App\Exports;

use App\Models\Participant;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;

class ParticipantExport implements FromView
{

    public function view(): View
    {
        return view('print.participant', ['items' => Participant::with(['client'])->get()]);
    }
}
