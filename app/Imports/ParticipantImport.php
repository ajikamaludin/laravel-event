<?php

namespace App\Imports;

use App\Models\Client;
use App\Models\Participant;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
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
            $id = $row['id'] ?? Str::random(4);
            $exist = Participant::where('code', $id)->first();
            if ($exist != null) {
                $id = $row['id'] . '_' . $row['nama'];
            }
            Participant::create([
                'code' => $id,
                'name' => $row['nama'],
                'phone' => $row['notelp'],
                'address' => $row['alamat'],
                'email' => $row['email'],
                'gender' => $row['jenis_kelamin'],
                'city' => $row['kota'],
                'dob' => $row['tanggal_lahir'],
                'job_trust' => $row['amanah_pekerjaan'] ?? '',
                'client_id' => Client::firstOrCreate(['company_name' => $row['nama_lembaga']])->id,
            ]);
        }
    }
}
