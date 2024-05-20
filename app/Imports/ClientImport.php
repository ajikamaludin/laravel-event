<?php

namespace App\Imports;

use App\Models\Client;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ClientImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            Client::create([
                'company_category' => $row['kategori'],
                'company_name' => $row['nama_lembaga'],
                'company_address' => $row['alamat_lembaga'],
                'company_phone' => $row['notelp_lembaga'],
                'pic_name' => $row['nama_contact_person'],
                'pic_phone' => $row['notelp_contact_person'],
            ]);
        }
    }
}
