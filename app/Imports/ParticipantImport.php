<?php

namespace App\Imports;

use App\Models\Client;
use App\Models\Participant;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ParticipantImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            Participant::create([
                'name' => $row['nama'],
                'phone' => $row['notelp'],
                'address' => $row['alamat'],
                'email' => $row['email'],
                'gender' => $row['jenis_kelamin'],
                'city' => $row['kota'],
                'dob' => $row['tanggal_lahir'],
                'client_id' => Client::firstOrCreate(['company_name' => $row['nama_lembaga']])->value('id'),
            ]);
        }
    }
}
