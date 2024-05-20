<?php

namespace App\Http\Controllers;

use App\Models\Logistic;
use App\Models\LogisticCategory;
use Illuminate\Http\Request;
use Inertia\Response;

class StatusLogisticController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Logistic::with(['category']);

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('StatusLogistic/Index', [
            'data' => $query->paginate(10),
        ]);
    }
}
