<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use App\Models\LogisticCategory;
use App\Models\MarketingActivityCategory;
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

        EventCategory::insert([
            ['id' => Str::ulid(), 'name' => 'Spiritual MQ'],
            ['id' => Str::ulid(), 'name' => 'Corporate'],
            ['id' => Str::ulid(), 'name' => 'Anak Remaja'],
            ['id' => Str::ulid(), 'name' => 'Event Organizer'],
            ['id' => Str::ulid(), 'name' => 'Internal'],
        ]);

        MarketingActivityCategory::insert([
            ['id' => Str::ulid(), 'name' => 'tender'],
            ['id' => Str::ulid(), 'name' => 'hunting'],
            ['id' => Str::ulid(), 'name' => 'calling'],
            ['id' => Str::ulid(), 'name' => 'closing'],
            ['id' => Str::ulid(), 'name' => 'dealing'],
            ['id' => Str::ulid(), 'name' => 'meeting'],
        ]);

        LogisticCategory::insert([
            ['id' => Str::ulid(), 'name' => 'ATK'],
            ['id' => Str::ulid(), 'name' => 'Sertifikat'],
            ['id' => Str::ulid(), 'name' => 'Kaporlap'],
        ]);
    }
}
