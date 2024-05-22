<?php

namespace App\Imports;

use App\Models\Committe;
use App\Models\Logistic;
use App\Models\LogisticCategory;
use App\Models\LogisticReception;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class LogisticReceptionImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            LogisticReception::create([
                'logistic_id' => Logistic::firstOrCreate(
                    ['name' => $row['jenis']],
                    ['category_id' => LogisticCategory::first()->id]
                )->value('id'),
                'commite_id' => Committe::firstOrCreate(['name' => $row['panitia']])->id,
                'rdate' => $row['tanggal'],
                'qty' => $row['jumlah'],
            ]);
        }
    }
}
