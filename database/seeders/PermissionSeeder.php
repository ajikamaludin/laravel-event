<?php

namespace Database\Seeders;

use App\Constants\PermissionConst;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (PermissionConst::LIST as $permission) {
            Permission::insert(['id' => Str::ulid(), ...$permission]);
        }

        $role = Role::create(['name' => 'Administrator']);

        $permissions = Permission::all();
        foreach ($permissions as $permission) {
            $role->rolePermissions()->create(['permission_id' => $permission->id]);
        }

        $managenemt = Role::create(['name' => 'Management']);
        $permissions = Permission::where([
            ['name', 'not like', '%user%'],
            ['name', 'not like', '%role%'],
            ['name', 'not like', '%setting%'],
        ])->get();
        foreach ($permissions as $permission) {
            $managenemt->rolePermissions()->create(['permission_id' => $permission->id]);
        }
        User::create([
            'name' => 'Management',
            'email' => 'management@admin.com',
            'password' => bcrypt('password'),
            'role_id' => $managenemt->id,
        ]);

        $marketing = Role::create(['name' => 'Marketing']);
        $permissions = Permission::where([
            ['name', 'not like', '%user%'],
            ['name', 'not like', '%role%'],
            ['name', 'not like', '%setting%'],
            ['name', 'not like', '%logistic%'],
        ])->get();
        foreach ($permissions as $permission) {
            $marketing->rolePermissions()->create(['permission_id' => $permission->id]);
        }
        User::create([
            'name' => 'Marketing',
            'email' => 'marketing@admin.com',
            'password' => bcrypt('password'),
            'role_id' => $marketing->id,
        ]);

        $operation = Role::create(['name' => 'Operation']);
        $permissions = Permission::where([
            ['name', 'not like', '%user%'],
            ['name', 'not like', '%role%'],
            ['name', 'not like', '%setting%'],
            ['name', 'not like', '%eventfinance%'],
            ['name', 'not like', '%marketingactivity%'],
        ])->get();
        foreach ($permissions as $permission) {
            $operation->rolePermissions()->create(['permission_id' => $permission->id]);
        }
        User::create([
            'name' => 'Operation',
            'email' => 'operation@admin.com',
            'password' => bcrypt('password'),
            'role_id' => $operation->id,
        ]);

        User::create([
            'name' => 'Super Administrator',
            'email' => 'root@admin.com',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Administator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'role_id' => $role->id,
        ]);
    }
}
