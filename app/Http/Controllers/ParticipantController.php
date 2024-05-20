<?php

namespace App\Http\Controllers;

use App\Exports\ParticipantExport;
use App\Imports\ParticipantImport;
use App\Models\Client;
use App\Models\Participant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class ParticipantController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Participant::with(['client']);

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        if ($request->city) {
            $query->where('city', $request->city);
        }

        if ($request->company) {
            $query->where('client_id', $request->company);
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Participant/Index', [
            'data' => $query->paginate(10),
            'clients' => Client::all(['id', 'company_name']),
            'cities' => Participant::groupBy('city')->get(['city']),
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
            'gender' => 'nullable|string',
            'city' => 'nullable|string',
            'dob' => 'nullable|date',
            'client_id' => 'required|exists:clients,id'
        ]);

        Participant::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
            'photo' => $request->photo,
            'gender' => $request->gender,
            'city' => $request->city,
            'dob' => $request->dob,
            'client_id' => $request->client_id,
        ]);

        return redirect()->route('participants.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function update(Request $request, Participant $participant): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'email' => 'nullable|email',
            'photo' => 'nullable|string',
            'gender' => 'nullable|string',
            'city' => 'nullable|string',
            'dob' => 'nullable|date',
            'client_id' => 'required|exists:clients,id'
        ]);

        $participant->fill([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
            'photo' => $request->photo,
            'gender' => $request->gender,
            'city' => $request->city,
            'dob' => $request->dob,
            'client_id' => $request->client_id,
        ]);

        $participant->save();

        return redirect()->route('participants.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Participant $participant): RedirectResponse
    {
        $participant->delete();

        return redirect()->route('participants.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function import(Request $request)
    {
        $request->validate(['file' => 'required|string']);

        Excel::import(new ParticipantImport, $request->file, 'public');

        return redirect()->route('participants.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed imported']);
    }

    public function export()
    {
        return Excel::download(new ParticipantExport, 'peserta.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function print()
    {
        return view('print.participant', ['items' => Participant::with(['client'])->get()]);
    }
}
