<?php

namespace App\Http\Controllers;

use App\Models\Event;
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

        $events = Event::whereBetween('start_date', [
            $startDate->format('d-m-Y'), $endDate->addWeeks(3)->endOfMonth()->format('d-m-Y')
        ]);

        return inertia('Dashboard', [
            'events' => $events->get(),
            '_start_date' => $startDate->format('Y-m-d'),
            '_end_date' => $endDate->format('Y-m-d'),
            'types' => $types
        ]);
    }

    public function maintance()
    {
        return inertia('Maintance');
    }
}
