<?php

namespace App\Exports\Report;

use App\Models\EventSpeaker;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class EventSpeakerExport implements FromView
{
    public function view(): View
    {
        return view('print.report.event_speaker', ['items' => EventSpeaker::with(['event.client', 'speaker'])->get()]);
    }
}
