<?php

namespace App\Http\Controllers;

use App\Exports\EventExport;
use App\Models\Event;
use App\Models\EventReport;
use App\Models\Logistic;
use App\Services\GeneralServices;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Event::with(['client', 'report']);

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        if ($request->m) {
            $query->where(function ($q) use ($request) {
                $q->whereMonth('start_date', $request->m)
                    ->orWhereMonth('end_date', $request->m);
            });
        }

        if ($request->y) {
            $query->where(function ($q) use ($request) {
                $q->whereYear('start_date', $request->y)
                    ->orWhereYear('end_date', $request->y);
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Event/Index', [
            'data' => $query->paginate(10),
            'months' => GeneralServices::generateMonths(),
            'years' => GeneralServices::generateYearEvents()
        ]);
    }

    public function create(): Response
    {
        return inertia('Event/Form', [
            'rstatuses' => EventReport::STATUSES
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type_id' => 'required|exists:event_types,id',
            'client_id' => 'required|exists:clients,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|gte:start_date',
            'place' => 'nullable|string',

            'report_date' => 'nullable|date',
            'file_finance' => 'nullable|string',
            'file_event' => 'nullable|string',
            'status' => 'required|in:0,1',

            'speakers' => 'nullable|array',
            'speakers.*.sdate' => 'nullable|date',
            'speakers.*.title' => 'nullable|string',
            'speakers.*.speaker.id' => 'nullable|exists:speakers,id',

            'participants' => 'nullable|array',
            'participants.*.participant.id' => 'nullable|exists:participants,id',

            'logistics' => 'nullable|array',
            'logistics.*.qty_used' => 'nullable|numeric',
            'logistics.*.logistic.id' => 'nullable|exists:logistics,id',

            'committes' => 'nullable|array',
            'committes.*.committe.id' => 'nullable|exists:committes,id',
            'committes.*.task.id' => 'nullable|exists:committe_tasks,id',
        ]);

        DB::beginTransaction();
        $event = Event::create([
            'name' => $request->name,
            'type_id' => $request->type_id,
            'client_id' => $request->client_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'place' => $request->place,
        ]);

        $event->report()->create([
            'rdate' => $request->report_date,
            'file_finance' => $request->file_finance,
            'file_event' => $request->file_event,
            'status' => $request->status,
        ]);

        if (count($request->speakers) != 0) {
            foreach (collect($request->speakers) as $speaker) {
                $event->speakers()->create([
                    'speaker_id' => $speaker['speaker']['id'],
                    'sdate' => $speaker['sdate'],
                    'title' => $speaker['title'],
                ]);
            }
        }

        if (count($request->participants) != 0) {
            foreach (collect($request->participants) as $participant) {
                $event->participants()->create([
                    'participant_id' => $participant['participant']['id'],
                ]);
            }
        }

        if (count($request->logistics) != 0) {
            foreach (collect($request->logistics) as $logistic) {
                $event->logistics()->create([
                    'logistic_id' => $logistic['logistic']['id'],
                    'qty_used' => $logistic['qty_used'],
                ]);
                // update logistic
                $slogistic = Logistic::find($logistic['logistic']['id']);
                $slogistic->update([
                    'qty_used' => $slogistic->qty_used + $logistic['qty_used'],
                    'qty_last' => $slogistic->qty_last - $logistic['qty_used'],
                ]);
            }
        }

        if (count($request->committes) != 0) {
            foreach (collect($request->committes) as $committe) {
                $committe = $event->committes()->create([
                    'committe_id' => $committe['committe']['id'],
                    'task_id' => $committe['task']['id'],
                ]);
            }
        }

        DB::commit();

        return redirect()->route('events.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function edit(Event $event): Response
    {
        return inertia('Event/Form', [
            'event' => $event->load([
                'client',
                'report',
                'speakers.speaker',
                'participants.participant',
                'logistics.logistic',
                'committes.committe',
                'committes.task',
            ]),
            'rstatuses' => EventReport::STATUSES
        ]);
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type_id' => 'required|exists:event_types,id',
            'client_id' => 'required|exists:clients,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|gte:start_date',
            'place' => 'nullable|string',

            'report_date' => 'nullable|date',
            'file_finance' => 'nullable|string',
            'file_event' => 'nullable|string',
            'status' => 'required|in:0,1',

            'speakers' => 'nullable|array',
            'speakers.*.sdate' => 'nullable|date',
            'speakers.*.title' => 'nullable|string',
            'speakers.*.speaker.id' => 'nullable|exists:speakers,id',

            'participants' => 'nullable|array',
            'participants.*.participant.id' => 'nullable|exists:participants,id',

            'logistics' => 'nullable|array',
            'logistics.*.qty_used' => 'nullable|numeric',
            'logistics.*.logistic.id' => 'nullable|exists:logistics,id',

            'committes' => 'nullable|array',
            'committes.*.committe.id' => 'nullable|exists:committes,id',
            'committes.*.task.id' => 'nullable|exists:committe_tasks,id',
        ]);

        DB::beginTransaction();
        $event->update([
            'name' => $request->name,
            'type_id' => $request->type_id,
            'client_id' => $request->client_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'place' => $request->place,
        ]);

        $event->report()->first()->update([
            'rdate' => $request->report_date,
            'file_finance' => $request->file_finance,
            'file_event' => $request->file_event,
            'status' => $request->status,
        ]);

        $event->speakers()->delete();
        if (count($request->speakers) != 0) {
            foreach (collect($request->speakers) as $speaker) {
                $event->speakers()->create([
                    'speaker_id' => $speaker['speaker']['id'],
                    'sdate' => $speaker['sdate'],
                    'title' => $speaker['title'],
                ]);
            }
        }

        $event->participants()->delete();
        if (count($request->participants) != 0) {
            foreach (collect($request->participants) as $participant) {
                $event->participants()->create([
                    'participant_id' => $participant['participant']['id'],
                ]);
            }
        }

        // revert logistic
        foreach ($event->logistics as $elogistic) {
            $logistic = Logistic::find($elogistic->logistic_id);
            $logistic->update([
                'qty_used' => $logistic->qty_used - $elogistic->qty_used,
                'qty_last' => $logistic->qty_last + $elogistic->qty_used,
            ]);
        }
        $event->logistics()->delete();
        if (count($request->logistics) != 0) {
            foreach (collect($request->logistics) as $logistic) {
                $event->logistics()->create([
                    'logistic_id' => $logistic['logistic']['id'],
                    'qty_used' => $logistic['qty_used'],
                ]);
                // update logistic
                $slogistic = Logistic::find($logistic['logistic']['id']);
                $slogistic->update([
                    'qty_used' => $slogistic->qty_used + $logistic['qty_used'],
                    'qty_last' => $slogistic->qty_last - $logistic['qty_used'],
                ]);
            }
        }

        $event->committes()->delete();
        if (count($request->committes) != 0) {
            foreach (collect($request->committes) as $committe) {
                $committe = $event->committes()->create([
                    'committe_id' => $committe['committe']['id'],
                    'task_id' => $committe['task']['id'],
                ]);
            }
        }

        DB::commit();

        return redirect()->route('events.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Event $event): RedirectResponse
    {
        $event->delete();

        return redirect()->route('events.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function export()
    {
        return Excel::download(new EventExport, 'even.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function print()
    {
        return view('print.event', ['items' => Event::with(['client', 'report'])->get()]);
    }
}
