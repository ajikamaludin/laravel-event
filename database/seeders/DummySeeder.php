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
            ['id' => Str::ulid(), 'key' => 'app_name', 'value' => 'Daisy UI App', 'type' => 'text'],
            ['id' => Str::ulid(), 'key' => 'app_logo', 'value' => '', 'type' => 'image'],
        ];

        Setting::insert($settings);
    }
}
