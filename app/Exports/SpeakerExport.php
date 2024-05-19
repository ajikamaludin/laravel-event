<?php

namespace App\Exports;

use App\Models\Speaker;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SpeakerExport implements FromCollection, WithHeadings
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
        return Speaker::all([
            'name',
            'phone',
            'address',
            'email',
            'photo',
        ]);
    }
}
