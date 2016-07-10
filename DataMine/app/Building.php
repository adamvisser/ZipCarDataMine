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

    public static function getBuilding($name)
    {
        $building = Building::where(['name'=>$name])->first();
        //check if the x and y passed in are here
        return $building;
    }

    public static function isAtBuilding(Building $building, $x, $y){
        if ($building->x == $x && $building->y == $y) {
           return true;
        }
        return false;
    }
}