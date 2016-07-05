<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWalkingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('walkings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('turn_number')->unsigned();
            $table->integer('person_time')->unsigned();
            $table->integer('person_time0')->unsigned();
            $table->integer('walking_to')->unsigned();
            $table->integer('walking_from')->unsigned();
            $table->integer('moment_id')->unsigned();
            $table->integer('people_id')->unsigned();
            $table->integer('x')->unsigned();
            $table->integer('y')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('walkings');
    }
}
