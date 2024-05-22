<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Models\EventSpeaker;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Response;

class EventSpeakerController extends Controller
{
    public function index(Request $request): Response
    {
        $startDate = now()->firstOfMonth();
        $endDate = now()->endOfMonth();

        $query = EventSpeaker::with(['event.client', 'speaker']);

        if ($request->q) {
            $query->whereHas('speaker', fn ($q) => $q->where('name', 'like', "%{$request->q}%"));
        }

        if ($request->speaker) {
            $query->where('speaker_id', $request->speaker);
        }

        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::parse($request->startDate);
            $endDate = Carbon::parse($request->endDate);
        }

        $dates = [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')];
        $query->where(function ($q) use ($dates) {
            $q->whereBetween('sdate', $dates);
        });

        $query->orderBy('updated_at', 'desc');

        return inertia('Report/EventSpeaker/Index', [
            'data' => $query->paginate(10),
            '_start_date' => $startDate->format('Y-m-d'),
            '_end_date' => $endDate->format('Y-m-d')
        ]);
    }
}
