<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Models\EventCommitte;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Response;

class EventCommitteReportController extends Controller
{
    public function index(Request $request): Response
    {
        $startDate = now()->firstOfMonth();
        $endDate = now()->endOfMonth();

        $query = EventCommitte::with(['event.client', 'committe', 'task']);

        if ($request->q) {
            $query->whereHas('committe', fn ($q) => $q->where('name', 'like', "%{$request->q}%"));
        }

        if ($request->committe) {
            $query->where('committe_id', $request->committe);
        }

        if ($request->task) {
            $query->where('task_id', $request->task);
        }

        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::parse($request->startDate);
            $endDate = Carbon::parse($request->endDate);
        }

        $dates = [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')];
        $query->whereHas('event', function ($subq) use ($dates) {
            $subq->where(function ($q) use ($dates) {
                $q->whereBetween('start_date', $dates)
                    ->orWhereBetween('end_date', $dates);
            });
        });

        $query->orderBy('updated_at', 'desc');

        return inertia('Report/EventCommitte/Index', [
            'data' => $query->paginate(10),
            '_start_date' => $startDate->format('Y-m-d'),
            '_end_date' => $endDate->format('Y-m-d')
        ]);
    }
}
