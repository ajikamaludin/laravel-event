<?php

namespace App\Http\Controllers;

use App\Exports\LogisticReceptionExport;
use App\Imports\LogisticReceptionImport;
use App\Models\Logistic;
use App\Models\LogisticReception;
use App\Services\GeneralServices;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class LogisticReceptionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = LogisticReception::with(['logistic', 'committee']);

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        if ($request->m) {
            $query->whereMonth('rdate', $request->m);
        }

        if ($request->y) {
            $query->whereYear('rdate', $request->y);
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Logisticreception/Index', [
            'data' => $query->paginate(10),
            'months' => GeneralServices::generateMonths(),
            'years' => GeneralServices::generateYearLogistics()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'logistic_id' => 'required|exists:logistics,id',
            'commite_id' => 'required|exists:committes,id',
            'rdate' => 'required|date',
            'qty' => 'required|numeric',
        ]);

        DB::beginTransaction();
        LogisticReception::create([
            'logistic_id' => $request->logistic_id,
            'commite_id' => $request->commite_id,
            'rdate' => $request->rdate,
            'qty' => $request->qty,
        ]);

        // create reception only
        $logistic = Logistic::find($request->logistic_id);
        $logistic->update([
            'qty_reception' => $logistic->qty_reception + $request->qty,
            'qty_last' => $logistic->qty_last + $request->qty,
        ]);
        DB::commit();

        return redirect()->route('logisticreceptions.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function update(Request $request, LogisticReception $logisticreception): RedirectResponse
    {
        $request->validate([
            'logistic_id' => 'required|exists:logistics,id',
            'commite_id' => 'required|exists:committes,id',
            'rdate' => 'required|date',
            'qty' => 'required|numeric',
        ]);

        DB::beginTransaction();
        // update reception only
        $logistic = Logistic::find($request->logistic_id);
        $logistic->update([
            'qty_reception' => $logistic->qty_reception + $request->qty - $logisticreception->qty,
            'qty_last' => $logistic->qty_last + $request->qty - $logisticreception->qty,
        ]);

        $logisticreception->fill([
            'logistic_id' => $request->logistic_id,
            'commite_id' => $request->commite_id,
            'rdate' => $request->rdate,
            'qty' => $request->qty,
        ]);
        DB::commit();

        $logisticreception->save();

        return redirect()->route('logisticreceptions.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(LogisticReception $logisticreception): RedirectResponse
    {
        $logisticreception->delete();

        return redirect()->route('logisticreceptions.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function export()
    {
        return Excel::download(new LogisticReceptionExport, 'kegiatan-logistik.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function print()
    {
        return view('print.logistic_reception', ['items' => LogisticReception::with(['logistic', 'committee'])->get()]);
    }

    public function import(Request $request)
    {
        $request->validate(['file' => 'required|string']);

        Excel::import(new LogisticReceptionImport, $request->file, 'public');

        return redirect()->route('logisticreceptions.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed imported']);
    }
}
