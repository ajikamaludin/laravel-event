<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('events', 'participant_count')) {
            Schema::table('events', function (Blueprint $table) {
                $table->integer('participant_count')->default(0);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('events', 'participant_count')) {
            Schema::table('events', function (Blueprint $table) {
                $table->dropColumn('participant_count')->default(0);
            });
        }
    }
};
