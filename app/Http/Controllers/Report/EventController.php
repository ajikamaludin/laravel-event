<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventType;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Response;

class EventController extends Controller
{
    public function index(Request $request): Response
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

        return inertia('Report/Event/Index', [
            'data' => $query->paginate(10),
            'categories' => EventCategory::all(),
            '_start_date' => $startDate->format('Y-m-d'),
            '_end_date' => $endDate->format('Y-m-d')
        ]);
    }
}
