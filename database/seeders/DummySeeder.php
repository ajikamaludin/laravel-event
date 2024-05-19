<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DummySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = [
            ['id' => Str::ulid(), 'key' => 'app_name', 'value' => 'Duta Transformasi Insani', 'type' => 'text'],
            ['id' => Str::ulid(), 'key' => 'app_logo', 'value' => 'app_logo.png', 'type' => 'image'],
        ];

        Setting::insert($settings);
    }
}
