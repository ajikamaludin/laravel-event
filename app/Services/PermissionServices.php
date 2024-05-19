<?php

namespace App\Services;

use App\Constants\PermissionConst;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Str;

class PermissionServices
{
    public static function new()
    {
        return new PermissionServices;
    }

    public function sync()
    {
        $lists = collect(PermissionConst::LIST)->map(fn ($permission) => $permission['name'])->toArray();
        $permissions = Permission::all()->pluck('name')->toArray();

        // remove existing permission in database
        $to_delete = array_diff($permissions, $lists);
        foreach ($to_delete as $name) {
            Permission::where('name', $name)->delete();
        }

        $adminRole = Role::where('name', 'admin')->first();
        // add new permission to database
        $to_add = array_diff($lists, $permissions);
        foreach ($to_add as $index => $name) {
            $np = Permission::create(['id' => Str::ulid(), ...PermissionConst::LIST[$index]]);
            if ($adminRole != null) {
                $adminRole->rolePermissions()->create(['permission_id' => $np->id]);
            }
        }

        return [$to_add, $to_delete];
    }
}
