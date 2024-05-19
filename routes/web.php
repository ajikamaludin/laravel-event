<?php

use App\Http\Controllers\CommitteController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('files/{file}', [UploadController::class, 'show'])->name('file.show');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [GeneralController::class, 'index'])->name('dashboard');
    Route::get('/maintance', [GeneralController::class, 'maintance'])->name('maintance');

    // User
    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    Route::post('/users', [UserController::class, 'store'])->name('user.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('user.destroy');

    // Role
    Route::resource('/roles', RoleController::class);

    // Setting
    Route::get('/settings', [SettingController::class, 'index'])->name('setting.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('setting.update');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // #Admin
    Route::get('committes/print', [CommitteController::class, 'print'])->name('committes.print');
    Route::get('committes/export', [CommitteController::class, 'export'])->name('committes.export');
    Route::delete('committes/{committe}', [CommitteController::class, 'destroy'])->name('committes.destroy');
    Route::put('committes/{committe}', [CommitteController::class, 'update'])->name('committes.update');
    Route::post('committes', [CommitteController::class, 'store'])->name('committes.store');
    Route::get('committes', [CommitteController::class, 'index'])->name('committes.index');
});

// #Guest
require __DIR__ . '/auth.php';
