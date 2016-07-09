<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Moment;
use App\Ziptopia;
use App\Building;

class People extends Model
{
	protected $table = 'people';

	protected $primaryKey = 'id';

	public $timestamps = False;

	protected $connection = 'mysql';

	protected $fillable = ['name','ziptopia_id'];

	protected $guarded = ['id'];

	public function ziptopia()
	{
		return $this->belongsTo('App\Ziptopa');
	}

	public function  waitingAts()
    {
        return $this->hasMany('App\Waiting');
    }

    public function  walkingTos()
    {
        return $this->hasMany('App\Walking');
    }


    /*
=================
    */
	public static function createOrRetrieve(Moment $currentMoment, $clientID, $destination, $name, $origin, $time, $time0, $turnNumber, $x, $y)
	{
		$person = People::firstOrCreate(['name' => $name,'ziptopia_id'=>$clientID]);
		//get the building the person is going to
		$destination= Building::getBuilding($destination);
		//get the building the person is headed from
		$origin= Building::getBuilding($origin, $x, $y);
		if ($origin->isAtBuilding) {
			//the person is waiting at the building, create a waiting
			Waiting::setupData($person->id, $origin->id, $turnNumber, $destination->id, $time, $time0, $x, $y, $currentMoment->id);
		}else{
			//the person has left the building, create a walking
			Walking::setupData($person->id, $origin->id, $turnNumber, $destination->id, $time, $time0, $x, $y, $currentMoment->id);
		}
		//return the person
		return $person;
	}

}