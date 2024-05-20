<?php

namespace App\Http\Controllers;

use App\Exports\MarketingActivityExport;
use App\Models\MarketingActivity;
use App\Services\GeneralServices;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class MarketingActivityController extends Controller
{
    public function index(Request $request): Response
    {
        $query = MarketingActivity::with(['category', 'client', 'committee']);

        if ($request->q) {
            $query->where('place', 'like', "%{$request->q}%")
                ->orWhere('notes', 'like', "%{$request->q}%");
        }

        if ($request->m) {
            $query->whereMonth('date', $request->m);
        }

        if ($request->y) {
            $query->whereYear('date', $request->y);
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Marketingactivity/Index', [
            'data' => $query->paginate(10),
            'months' => GeneralServices::generateMonths(),
            'years' => GeneralServices::generateYearEvents()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'category_id' => 'required|exists:marketing_activity_categories,id',
            'client_id' => 'required|exists:clients,id',
            'committee_id' => 'required|exists:committes,id',
            'date' => 'required|date',
            'place' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        MarketingActivity::create([
            'category_id' => $request->category_id,
            'client_id' => $request->client_id,
            'date' => $request->date,
            'place' => $request->place,
            'committee_id' => $request->committee_id,
            'notes' => $request->notes,
        ]);

        return redirect()->route('marketingactivities.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function update(Request $request, MarketingActivity $marketingactivity): RedirectResponse
    {
        $request->validate([
            'category_id' => 'required|exists:marketing_activity_categories,id',
            'client_id' => 'required|exists:clients,id',
            'committee_id' => 'required|exists:committes,id',
            'date' => 'required|date',
            'place' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $marketingactivity->fill([
            'category_id' => $request->category_id,
            'client_id' => $request->client_id,
            'date' => $request->date,
            'place' => $request->place,
            'committee_id' => $request->committee_id,
            'notes' => $request->notes,
        ]);

        $marketingactivity->save();

        return redirect()->route('marketingactivities.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(MarketingActivity $marketingactivity): RedirectResponse
    {
        $marketingactivity->delete();

        return redirect()->route('marketingactivities.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function export()
    {
        return Excel::download(new MarketingActivityExport, 'kegiatan-marketing.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function print()
    {
        return view('print.marketing_activity', ['items' => MarketingActivity::with(['category', 'client', 'committee'])->get()]);
    }
}
