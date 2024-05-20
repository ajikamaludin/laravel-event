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
        Schema::create('logistics', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->ulid('category_id');
            $table->string('name')->nullable();
            $table->decimal('qty_used', 20, 2)->default(0);
            $table->decimal('qty_reception', 20, 2)->default(0);
            $table->decimal('qty_last', 20, 2)->default(0);
            $table->timestamps();
            $table->softDeletes();
            $table->ulid('created_by')->nullable();
            $table->ulid('updated_by')->nullable();
            $table->ulid('deleted_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logistics');
    }
};
