<?php

namespace App\Http\Controllers;

use App\Exports\EventTypeExport;
use App\Models\EventCategory;
use App\Models\EventType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class EventTypeController extends Controller
{
    public function index(Request $request): Response
    {
        $query = EventType::with(['category']);

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Eventtype/Index', [
            'data' => $query->paginate(10),
            'categories' => EventCategory::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:event_categories,id'
        ]);

        EventType::create([
            'name' => $request->name,
            'category_id' => $request->category_id
        ]);

        return redirect()->route('eventtypes.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function update(Request $request, EventType $eventtype): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:event_categories,id'
        ]);

        $eventtype->fill([
            'name' => $request->name,
            'category_id' => $request->category_id
        ]);

        $eventtype->save();

        return redirect()->route('eventtypes.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(EventType $eventtype): RedirectResponse
    {
        $eventtype->delete();

        return redirect()->route('eventtypes.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function export()
    {
        return Excel::download(new EventTypeExport, 'jenis_event.xlsx');
    }

    public function print()
    {
        return view('print.event_type', ['items' => EventType::all()]);
    }
}
