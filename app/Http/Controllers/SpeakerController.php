<?php

namespace App\Http\Controllers;

use App\Exports\SpeakerExport;
use App\Models\Speaker;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class SpeakerController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Speaker::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%")
                ->orWhere('phone', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Speaker/Index', [
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

        Speaker::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
            'photo' => $request->photo,
        ]);

        return redirect()->route('speakers.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function update(Request $request, Speaker $speaker): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'email' => 'nullable|email',
            'photo' => 'nullable|string',
        ]);

        $speaker->fill([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
            'photo' => $request->photo,
        ]);

        $speaker->save();

        return redirect()->route('speakers.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Speaker $speaker): RedirectResponse
    {
        $speaker->delete();

        return redirect()->route('speakers.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function export()
    {
        return Excel::download(new SpeakerExport, 'pemateri.xlsx');
    }

    public function print()
    {
        return view('print.speaker', ['items' => Speaker::all([
            'name',
            'phone',
            'address',
            'email',
            'photo',
        ])]);
    }
}
