<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
	protected $table = 'buildings';
    public $timestamps = False;
	protected $fillable = ['name','x','y'];
    protected $guarded = ['id'];
	public function  waitingAts()
    {
        return $this->hasMany('App\Waiting', 'waiting_at');
    }

    public function  waitingForss()
    {
        return $this->hasMany('App\Waiting', 'waiting_for');
    }

    public function  walkingTos()
    {
        return $this->hasMany('App\Walking', 'walking_to');
    }

    public function  walkingFroms()
    {
        return $this->hasMany('App\Walking', 'walking_from');
    }
}