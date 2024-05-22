<?php

namespace App\Http\Controllers;

use App\Exports\ClientExport;
use App\Imports\ClientImport;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class ClientController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Client::query();

        if ($request->q) {
            $query->where('company_name', 'like', "%{$request->q}%");
        }

        if ($request->company_category) {
            $query->where('company_category', $request->company_category);
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Client/Index', [
            'data' => $query->paginate(10),
            'categories' => Client::groupBy('company_category')->select('company_category')->get()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'company_category' => 'required|string',
            'company_name' => 'required|string',
            'company_address' => 'nullable|string',
            'company_logo' => 'nullable|string',
            'company_phone' => 'nullable|string',
            'pic_name' => 'required|string',
            'pic_phone' => 'required|string',
        ]);

        Client::create([
            'company_category' => $request->company_category,
            'company_name' => $request->company_name,
            'company_address' => $request->company_address,
            'company_logo' => $request->company_logo,
            'company_phone' => $request->company_phone,
            'pic_name' => $request->pic_name,
            'pic_phone' => $request->pic_phone,
        ]);

        return redirect()->route('clients.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function update(Request $request, Client $client): RedirectResponse
    {
        $request->validate([
            'company_category' => 'required|string',
            'company_name' => 'required|string',
            'company_address' => 'nullable|string',
            'company_logo' => 'nullable|string',
            'company_phone' => 'nullable|string',
            'pic_name' => 'required|string',
            'pic_phone' => 'nullable|string',
        ]);

        $client->fill([
            'company_category' => $request->company_category,
            'company_name' => $request->company_name,
            'company_address' => $request->company_address,
            'company_logo' => $request->company_logo,
            'company_phone' => $request->company_phone,
            'pic_name' => $request->pic_name,
            'pic_phone' => $request->pic_phone,
        ]);

        $client->save();

        return redirect()->route('clients.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Client $client): RedirectResponse
    {
        $client->delete();

        return redirect()->route('clients.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function import(Request $request)
    {
        $request->validate(['file' => 'required|string']);

        Excel::import(new ClientImport, $request->file, 'public');

        return redirect()->route('clients.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed imported']);
    }

    public function export()
    {
        return Excel::download(new ClientExport, 'lembaga.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function print()
    {
        return view('print.client', ['items' => Client::all([
            'company_category',
            'company_name',
            'company_address',
            'company_phone',
            'pic_name',
            'pic_phone',
        ])]);
    }
}
