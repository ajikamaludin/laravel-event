<?php

namespace App\Exports;

use App\Models\Committe;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CommitteExport implements FromCollection, WithHeadings
{

    public function headings(): array
    {
        return [
            'Nama',
            'No. Telp',
            'Alamat',
            'Email',
            'Photo Url',
        ];
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Committe::all([
            'name',
            'phone',
            'address',
            'email',
            'photo',
        ]);
    }
}
