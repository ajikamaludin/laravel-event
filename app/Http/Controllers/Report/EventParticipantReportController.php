<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Models\EventParticipant;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Response;

class EventParticipantReportController extends Controller
{
    public function index(Request $request): Response
    {
        $startDate = now()->firstOfMonth();
        $endDate = now()->endOfMonth();

        $query = EventParticipant::with(['participant']);

        if ($request->q) {
            $query->whereHas('participant', fn ($q) => $q->where('name', 'like', "%{$request->q}%"));
        }

        if ($request->event) {
            $query->where('event_id', $request->event);
        }

        if ($request->client) {
            $query->whereHas('event', function ($sq) use ($request) {
                $sq->where('client_id', $request->client);
            });
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

        return inertia('Report/EventParticipant/Index', [
            'data' => $query->paginate(10),
            '_start_date' => $startDate->format('Y-m-d'),
            '_end_date' => $endDate->format('Y-m-d')
        ]);
    }

    public function show(Request $request)
    {
        $participant = null;

        if ($request->client && $request->participant) {
            $participant = Participant::find($request->participant)
                ->load([
                    'client',
                    'events' => fn ($q) => $q->whereHas('event', fn ($q) => $q->where('client_id', $request->client)),
                    'events.event'
                ]);
        }

        return inertia('Report/Participant/Index', [
            '_participant' => $participant
        ]);
    }
}
