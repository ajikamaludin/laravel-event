<?php

namespace App\Http\Controllers;

use App\Exports\LogisticExport;
use App\Models\Logistic;
use App\Models\LogisticCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class LogisticController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Logistic::with(['category']);

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Logistic/Index', [
            'data' => $query->paginate(10),
            'categories' => LogisticCategory::all(['id', 'name'])
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:logistic_categories,id'
        ]);

        Logistic::create([
            'name' => $request->name,
            'category_id' => $request->category_id
        ]);

        return redirect()->route('logistics.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function update(Request $request, Logistic $logistic): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:logistic_categories,id'
        ]);

        $logistic->fill([
            'name' => $request->name,
            'category_id' => $request->category_id
        ]);

        $logistic->save();

        return redirect()->route('logistics.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Logistic $logistic): RedirectResponse
    {
        $logistic->delete();

        return redirect()->route('logistics.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function export()
    {
        return Excel::download(new LogisticExport, 'logistik.xlsx');
    }

    public function print()
    {
        return view('print.logistic', ['items' => Logistic::with(['category'])->get()]);
    }
}
