<?php

use App\Http\Controllers\StatusLogisticController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LogisticReceptionController;
use App\Http\Controllers\MarketingActivityController;
use App\Http\Controllers\CommitteTaskController;
use App\Http\Controllers\EventTypeController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\LogisticController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommitteController;
use App\Http\Controllers\EventFinanceController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SpeakerController;
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
    Route::get('eventfinances/print', [EventFinanceController::class, 'print'])->name('eventfinances.print');
    Route::get('eventfinances/export', [EventFinanceController::class, 'export'])->name('eventfinances.export');
    Route::put('eventfinances/{event}', [EventFinanceController::class, 'update'])->name('eventfinances.update');
    Route::get('eventfinances', [EventFinanceController::class, 'index'])->name('eventfinances.index');

    Route::get('status-logistics', [StatusLogisticController::class, 'index'])->name('statuslogistics.index');

    Route::get('events/print', [EventController::class, 'print'])->name('events.print');
    Route::get('events/export', [EventController::class, 'export'])->name('events.export');
    Route::resource('events', EventController::class);

    Route::post('logisticreceptions/import', [LogisticReceptionController::class, 'import'])->name('logisticreceptions.import');
    Route::get('logisticreceptions/print', [LogisticReceptionController::class, 'print'])->name('logisticreceptions.print');
    Route::get('logisticreceptions/export', [LogisticReceptionController::class, 'export'])->name('logisticreceptions.export');
    Route::delete('logisticreceptions/{logisticreception}', [LogisticReceptionController::class, 'destroy'])->name('logisticreceptions.destroy');
    Route::put('logisticreceptions/{logisticreception}', [LogisticReceptionController::class, 'update'])->name('logisticreceptions.update');
    Route::post('logisticreceptions', [LogisticReceptionController::class, 'store'])->name('logisticreceptions.store');
    Route::get('logisticreceptions', [LogisticReceptionController::class, 'index'])->name('logisticreceptions.index');

    Route::get('marketingactivities/print', [MarketingActivityController::class, 'print'])->name('marketingactivities.print');
    Route::get('marketingactivities/export', [MarketingActivityController::class, 'export'])->name('marketingactivities.export');
    Route::delete('marketingactivities/{marketingactivity}', [MarketingActivityController::class, 'destroy'])->name('marketingactivities.destroy');
    Route::put('marketingactivities/{marketingactivity}', [MarketingActivityController::class, 'update'])->name('marketingactivities.update');
    Route::post('marketingactivities', [MarketingActivityController::class, 'store'])->name('marketingactivities.store');
    Route::get('marketingactivities', [MarketingActivityController::class, 'index'])->name('marketingactivities.index');

    Route::get('committetasks/print', [CommitteTaskController::class, 'print'])->name('committetasks.print');
    Route::get('committetasks/export', [CommitteTaskController::class, 'export'])->name('committetasks.export');
    Route::delete('committetasks/{committetask}', [CommitteTaskController::class, 'destroy'])->name('committetasks.destroy');
    Route::put('committetasks/{committetask}', [CommitteTaskController::class, 'update'])->name('committetasks.update');
    Route::post('committetasks', [CommitteTaskController::class, 'store'])->name('committetasks.store');
    Route::get('committetasks', [CommitteTaskController::class, 'index'])->name('committetasks.index');

    Route::get('eventtypes/print', [EventTypeController::class, 'print'])->name('eventtypes.print');
    Route::get('eventtypes/export', [EventTypeController::class, 'export'])->name('eventtypes.export');
    Route::delete('eventtypes/{eventtype}', [EventTypeController::class, 'destroy'])->name('eventtypes.destroy');
    Route::put('eventtypes/{eventtype}', [EventTypeController::class, 'update'])->name('eventtypes.update');
    Route::post('eventtypes', [EventTypeController::class, 'store'])->name('eventtypes.store');
    Route::get('eventtypes', [EventTypeController::class, 'index'])->name('eventtypes.index');

    Route::post('participants/import', [ParticipantController::class, 'import'])->name('participants.import');
    Route::get('participants/print', [ParticipantController::class, 'print'])->name('participants.print');
    Route::get('participants/export', [ParticipantController::class, 'export'])->name('participants.export');
    Route::delete('participants/{participant}', [ParticipantController::class, 'destroy'])->name('participants.destroy');
    Route::put('participants/{participant}', [ParticipantController::class, 'update'])->name('participants.update');
    Route::post('participants', [ParticipantController::class, 'store'])->name('participants.store');
    Route::get('participants', [ParticipantController::class, 'index'])->name('participants.index');

    Route::get('logistics/print', [LogisticController::class, 'print'])->name('logistics.print');
    Route::get('logistics/export', [LogisticController::class, 'export'])->name('logistics.export');
    Route::delete('logistics/{logistic}', [LogisticController::class, 'destroy'])->name('logistics.destroy');
    Route::put('logistics/{logistic}', [LogisticController::class, 'update'])->name('logistics.update');
    Route::post('logistics', [LogisticController::class, 'store'])->name('logistics.store');
    Route::get('logistics', [LogisticController::class, 'index'])->name('logistics.index');

    Route::post('clients/import', [ClientController::class, 'import'])->name('clients.import');
    Route::get('clients/print', [ClientController::class, 'print'])->name('clients.print');
    Route::get('clients/export', [ClientController::class, 'export'])->name('clients.export');
    Route::delete('clients/{client}', [ClientController::class, 'destroy'])->name('clients.destroy');
    Route::put('clients/{client}', [ClientController::class, 'update'])->name('clients.update');
    Route::post('clients', [ClientController::class, 'store'])->name('clients.store');
    Route::get('clients', [ClientController::class, 'index'])->name('clients.index');

    Route::get('committes/print', [CommitteController::class, 'print'])->name('committes.print');
    Route::get('committes/export', [CommitteController::class, 'export'])->name('committes.export');
    Route::delete('committes/{committe}', [CommitteController::class, 'destroy'])->name('committes.destroy');
    Route::put('committes/{committe}', [CommitteController::class, 'update'])->name('committes.update');
    Route::post('committes', [CommitteController::class, 'store'])->name('committes.store');
    Route::get('committes', [CommitteController::class, 'index'])->name('committes.index');

    Route::get('speakers/print', [SpeakerController::class, 'print'])->name('speakers.print');
    Route::get('speakers/export', [SpeakerController::class, 'export'])->name('speakers.export');
    Route::delete('speakers/{speaker}', [SpeakerController::class, 'destroy'])->name('speakers.destroy');
    Route::put('speakers/{speaker}', [SpeakerController::class, 'update'])->name('speakers.update');
    Route::post('speakers', [SpeakerController::class, 'store'])->name('speakers.store');
    Route::get('speakers', [SpeakerController::class, 'index'])->name('speakers.index');
});

// #Guest
require __DIR__ . '/auth.php';
