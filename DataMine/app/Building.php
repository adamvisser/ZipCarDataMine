<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
	protected $table = 'buildings';
	protected $fillable = ['name','x','y'];
	public function  waitingAts()
    {
        return $this->hasMany('App\Waiting', 'waiting_at','name');
    }

    public function  waitingForss()
    {
        return $this->hasMany('App\Waiting', 'waiting_for','name');
    }
}