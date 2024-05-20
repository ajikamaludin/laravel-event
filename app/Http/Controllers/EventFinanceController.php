<?php

namespace App\Http\Controllers;

use App\Exports\EventFinanceExport;
use App\Models\Event;
use App\Services\GeneralServices;
use Illuminate\Http\Request;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class EventFinanceController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Event::with(['client', 'report', 'finance']);

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

        return inertia('EventFinance/Index', [
            'data' => $query->paginate(10),
            'months' => GeneralServices::generateMonths(),
            'years' => GeneralServices::generateYearEvents()
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $request->validate(['income' => 'required|numeric', 'expense' => 'required|numeric']);

        $event->finance->update(['income' => $request->income, 'expense' => $request->expense]);

        return redirect()->route('eventfinances.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function export()
    {
        return Excel::download(new EventFinanceExport, 'keuangan-event.xlsx');
    }

    public function print()
    {
        return view('print.event_finance', ['items' => Event::with(['client', 'report', 'finance'])->get()]);
    }
}
