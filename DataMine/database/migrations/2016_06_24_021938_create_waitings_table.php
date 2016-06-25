<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWaitingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('waitings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('total_waiting');
            $table->integer('remaining_waiting');
            $table->integer('waiting_at')->unsigned();
            $table->integer('waiting_for')->unsigned();
            $table->integer('moment_id')->unsigned();
            $table->integer('people_id')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('waitings');
    }
}
