<?php

namespace App\Http\Controllers;

use App\Exports\CommitteTaskExport;
use App\Models\CommitteTask;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class CommitteTaskController extends Controller
{
    public function index(Request $request): Response
    {
        $query = CommitteTask::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Committetask/Index', [
            'data' => $query->paginate(10),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        CommitteTask::create([
            'name' => $request->name
        ]);

        return redirect()->route('committetasks.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function update(Request $request, CommitteTask $committetask): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $committetask->fill([
            'name' => $request->name,
        ]);

        $committetask->save();

        return redirect()->route('committetasks.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(CommitteTask $committetask): RedirectResponse
    {
        $committetask->delete();

        return redirect()->route('committetasks.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function export()
    {
        return Excel::download(new CommitteTaskExport, 'tugas_panitia.xlsx');
    }

    public function print()
    {
        return view('print.committe_task', ['items' => CommitteTask::all()]);
    }
}
