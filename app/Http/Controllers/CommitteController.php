<?php

namespace App\Http\Controllers;

use App\Exports\CommitteExport;
use App\Models\Committe;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class CommitteController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Committe::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%")
                ->orWhere('phone', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Committe/Index', [
            'data' => $query->paginate(10),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'email' => 'nullable|email',
            'photo' => 'nullable|string',
        ]);

        Committe::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
            'photo' => $request->photo,
        ]);

        return redirect()->route('committes.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function update(Request $request, Committe $committe): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'email' => 'nullable|email',
            'photo' => 'nullable|string',
        ]);

        $committe->fill([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
            'photo' => $request->photo,
        ]);

        $committe->save();

        return redirect()->route('committes.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Committe $committe): RedirectResponse
    {
        $committe->delete();

        return redirect()->route('committes.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function export()
    {
        return Excel::download(new CommitteExport, 'panitia.xlsx');
    }

    public function print()
    {
        return view('print.committe', ['items' => Committe::all([
            'name',
            'phone',
            'address',
            'email',
            'photo',
        ])]);
    }
}
