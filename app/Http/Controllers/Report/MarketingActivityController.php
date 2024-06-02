<?php

namespace App\Http\Controllers\Report;

use App\Exports\Report\MarketingActivityExport;
use App\Http\Controllers\Controller;
use App\Models\MarketingActivity;
use App\Models\MarketingActivityCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class MarketingActivityController extends Controller
{
    public function index(Request $request): Response
    {
        [$query, $startDate, $endDate] = $this->query($request);

        return inertia('Report/MarketingActivity/Index', [
            'data' => $query->paginate(10),
            'categories' => MarketingActivityCategory::all(),
            '_start_date' => $startDate->format('Y-m-d'),
            '_end_date' => $endDate->format('Y-m-d')
        ]);
    }

    public function export(Request $request)
    {
        [$query, $startDate, $endDate] = $this->query($request);

        return Excel::download(new MarketingActivityExport($query), 'report-kegiatan-marketing.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function print(Request $request)
    {
        [$query, $startDate, $endDate] = $this->query($request);

        return view('print.report.marketing_activity', ['items' => $query->get()]);
    }

    private function query(Request $request)
    {
        $startDate = now()->firstOfMonth();
        $endDate = now()->endOfMonth();

        $query = MarketingActivity::with(['category', 'client', 'committee']);

        if ($request->q) {
            $query->where(function ($sq) use ($request) {
                $sq->where('place', 'like', "%{$request->q}%")
                    ->orWhere('notes', 'like', "%{$request->q}%");
            });
        }

        if ($request->category) {
            $query->where('category_id', $request->category);
        }

        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::parse($request->startDate);
            $endDate = Carbon::parse($request->endDate);
        }

        $dates = [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')];
        $query->whereBetween('date', $dates);

        $query->orderBy('created_at', 'desc');

        return [$query, $startDate, $endDate];
    }
}
