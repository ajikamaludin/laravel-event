<?php

namespace App\Generator;

use Exception;
use Illuminate\Support\Facades\File;

class PermissionGenerator
{
    public static function new()
    {
        return new PermissionGenerator;
    }

    public function addPermission($name, $label)
    {
        $permission = "\t\t['label' => '".$label."', 'name' => '".$name."'],\n";

        // Open the file in read mode to read its contents
        $file = File::get(app_path('Constants/PermissionConst.php'));

        $marker = "// #Add New Permission Below!\n";
        $position = strpos($file, $marker) + strlen($marker);

        if (! $position) {
            throw new Exception('PermissionConst marker is not set');
        }

        $file = substr_replace($file, $permission, $position, 0);

        // Open the file in write mode to overwrite its contents
        File::put(app_path('Constants/PermissionConst.php'), $file);

        return $position;
    }

    public function addPermissions(array $permissions)
    {
        foreach ($permissions as $permission) {
            $this->addPermission(...$permission);
        }
    }
}
