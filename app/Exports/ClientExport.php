<?php

namespace App\Exports;

use App\Models\Client;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ClientExport implements FromCollection, WithHeadings
{

    public function headings(): array
    {
        return [
            'Kategori',
            'Nama Lembaga',
            'Alamat Lembaga',
            'No.Telp Lembaga',
            'Nama Contact Person',
            'No.Telp Contact Person',
        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Client::all([
            'company_category',
            'company_name',
            'company_address',
            'company_phone',
            'pic_name',
            'pic_phone',
        ]);
    }
}
