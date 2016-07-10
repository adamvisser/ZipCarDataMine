<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateZiptopiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ziptopias', function (Blueprint $table) {
            $table->increments('id');
            $table->double('client_id', 13, 0)->unsigned();
            $table->integer('start_time')->unsigned();
            $table->integer('end_time')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('ziptopias');
    }
}
