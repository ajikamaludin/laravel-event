<?php

namespace App\Services;

use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use ZipArchive;

class ZipServices
{
    protected $zip;

    protected $excludedPaths = [
        '.zip',
        'node_modules',
        '.git',
        '.vscode',
        '.gif',
        'ROADMAP.md',
        'storage/logs/laravel.log',
        'storage/app/public',
    ];

    public function __construct()
    {
        $this->zip = new ZipArchive;
    }

    public function addExcludedPaths(array $path)
    {
        $this->excludedPaths = array_merge($path, $this->excludedPaths);
    }

    public function addExcludedPath(string $path)
    {
        $this->excludedPaths[] = $path;
    }

    public function create($source, $destination)
    {
        if (! file_exists($source)) {
            return false;
        }

        if ($this->zip->open($destination, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            return false;
        }

        $parents = glob($source.'/*');

        foreach ($parents as $parent) {
            if (in_array($parent, ['.', '..'])) {
                continue;
            }

            if ($this->isExcluded($parent)) {
                continue;
            }

            $this->addToZip($parent, $source);
        }

        return $this->zip->close();
    }

    private function addToZip($source, $destination)
    {
        if (is_file($source)) {
            $this->zip->addFile($source, substr($source, strlen($destination) + 1));

            return;
        }

        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($source),
            RecursiveIteratorIterator::SELF_FIRST
        );

        foreach ($files as $file) {
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($destination) + 1);

            if ($this->isExcluded($filePath)) {
                continue;
            }

            if (is_dir($filePath)) {
                $this->zip->addEmptyDir($relativePath);
            } else {
                $this->zip->addFile($filePath, $relativePath);
            }
        }
    }

    private function isExcluded($path)
    {
        foreach ($this->excludedPaths as $excludedPath) {
            if (strpos($path, $excludedPath)) {
                return true;
            }
        }

        return false;
    }
}
