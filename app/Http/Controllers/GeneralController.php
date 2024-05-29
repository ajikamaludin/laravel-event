<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventFinance;
use App\Models\EventParticipant;
use App\Models\EventType;
use App\Models\MarketingActivity;
use App\Models\MarketingActivityCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class GeneralController extends Controller
{
    public function index(Request $request)
    {

        $startDate = now()->firstOfMonth();
        $endDate = now()->endOfMonth();

        if ($request->startDate != '') {
            $startDate = Carbon::parse($request->startDate);
        }
        if ($request->endDate != '') {
            $endDate = Carbon::parse($request->endDate);
        }

        $types = MarketingActivityCategory::all()->map(function ($c) use ($startDate, $endDate) {
            $c->count = MarketingActivity::where('category_id', $c->id)
                ->whereBetween('date', [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])
                ->count();
            return $c;
        });

        $eventcats = EventCategory::all()->map(function ($ec) use ($startDate, $endDate) {
            $ec->count = Event::whereIn('type_id', EventType::where('category_id', $ec->id)->pluck('id')->toArray())
                ->whereBetween('start_date', [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])
                ->count();
            return $ec;
        });

        $eventparticipants = EventCategory::all()->map(function ($ec) use ($startDate, $endDate) {
            $ec->count = Event::whereIn('type_id', EventType::where('category_id', $ec->id)->pluck('id')->toArray())
                ->whereBetween('start_date', [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])
                ->sum('participant_count');
            return $ec;
        });

        $eventIds = Event::whereBetween('start_date', [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])->pluck('id')->toArray();
        $finances = EventFinance::whereIn('event_id', $eventIds)
            ->selectRaw('SUM(income) as income, SUM(expense) as expense, SUM(income - expense)as profile')
            ->first();

        $events = Event::whereBetween('start_date', [
            $startDate->format('d-m-Y'), $endDate->addWeeks(3)->endOfMonth()->format('d-m-Y')
        ])->get();

        $eventlasts = Event::with(['client'])->orderBy('created_at', 'desc')->limit(10)->get();

        return inertia('Dashboard', [
            'events' => $events,
            '_start_date' => $startDate->format('Y-m-d'),
            '_end_date' => $endDate->format('Y-m-d'),
            'types' => $types,
            'eventcats' => $eventcats,
            'finances' => $finances,
            'eventparticipants' => $eventparticipants,
            'eventlasts' => $eventlasts,
        ]);
    }

    public function maintance()
    {
        return inertia('Maintance');
    }
}
