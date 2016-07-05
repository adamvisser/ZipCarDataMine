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

    public static function getBuilding($name, $x=-1, $y=-1)
    {
        if($x==-1 || $y==-1){
            $whereClause = ['name'=>$name];
        }else{
            $whereClause = ['name'=>$name, 'x'=> $x, 'y'=> $y];
        }
        return Building::where($whereClause)->get()->first();
    }
}