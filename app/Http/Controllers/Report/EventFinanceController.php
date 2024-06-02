<?php

namespace App\Http\Controllers\Report;

use App\Exports\Report\EventFinanceExport;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventType;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class EventFinanceController extends Controller
{
    public function index(Request $request): Response
    {
        [$query, $startDate, $endDate] = $this->query($request);

        return inertia('Report/EventFinance/Index', [
            'data' => $query->paginate(10),
            'categories' => EventCategory::all(),
            '_start_date' => $startDate->format('Y-m-d'),
            '_end_date' => $endDate->format('Y-m-d')
        ]);
    }

    public function export(Request $request)
    {
        [$query, $startDate, $endDate] = $this->query($request);

        return Excel::download(new EventFinanceExport($query), 'report-event-keuangan.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function print(Request $request)
    {
        [$query, $startDate, $endDate] = $this->query($request);

        return view('print.report.event_finance', ['items' => $query->get()]);
    }

    private function query(Request $request)
    {
        $startDate = now()->firstOfMonth();
        $endDate = now()->endOfMonth();

        $query = Event::with(['client', 'type.category', 'finance']);

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
