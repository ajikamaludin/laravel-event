<?php

namespace App\Http\Controllers\Report;

use App\Exports\Report\EventExport;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventType;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        [$query, $startDate, $endDate] = $this->query($request);

        return inertia('Report/Event/Index', [
            'data' => $query->paginate(10),
            'categories' => EventCategory::all(),
            '_start_date' => $startDate->format('Y-m-d'),
            '_end_date' => $endDate->format('Y-m-d')
        ]);
    }

    public function show(Request $request)
    {
        $event = null;

        if ($request->event) {
            $event = Event::find($request->event)
                ->load([
                    'speakers.speaker',
                    'committes.committe',
                    'committes.task',
                    'logistics.logistic',
                    'client',
                    'finance',
                    'report'
                ]);
        }

        return inertia('Report/Event/Show', [
            '_event' => $event
        ]);
    }

    public function exportEvent(Request $request)
    {
        [$query, $startDate, $endDate] = $this->query($request);

        return Excel::download(new EventExport($query), 'report-event.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function printEvent(Request $request)
    {
        [$query, $startDate, $endDate] = $this->query($request);

        return view('print.report.event', ['items' => $query->get()]);
    }


    public function printEventDetail(Event $event)
    {
        return view('print.report.event_detail', [
            'event' => $event->load([
                'speakers.speaker',
                'committes.committe',
                'committes.task',
                'logistics.logistic',
                'client',
                'finance',
                'report'
            ])
        ]);
    }

    public function query(Request $request)
    {
        $startDate = now()->firstOfMonth();
        $endDate = now()->endOfMonth();

        $query = Event::with(['client', 'type.category'])->withCount(['participants']);

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        if ($request->category) {
            $query->whereIn('type_id', EventType::where('category_id', $request->category)->pluck('id')->toArray());
        }

        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::parse($request->startDate);
            $endDate = Carbon::parse($request->endDate);
        }

        $dates = [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')];
        $query->where(function ($q) use ($dates) {
            $q->whereBetween('start_date', $dates)
                ->orWhereBetween('end_date', $dates);
        });

        $query->orderBy('updated_at', 'desc');

        return [$query, $startDate, $endDate];
    }
}
