<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Moment;
use App\Ziptopia;
use App\Building;

class People extends Model
{
	protected $table = 'products';

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
		//find the person
		$person = People::where('name',$name)->where('ziptopia_id',$clientID)->get()->first();
		if (!$person) {
			//or create it
			$person = People::create(['name' => $peopleRequest['name'],'ziptopia_id'=>]);
		}
		//get the building the person is going to
		$destination= Building::getBuilding($destination);
		//get the building the person is headed from
		$origin= Building::getBuilding($origin, $x, $y);
		if ($origin->isAtOrigin) {
			//the person is waiting at the building, create a waiting
			$action = Waiting::setupData($person->id, $origin->id, $turnNumber, $destination->id, $time, $time0, $x, $y, $currentMoment->id));
		}else{
			//the person has left the building, create a walking
			$action = Walking::setupData($person->id, $origin->id, $turnNumber, $destination->id, $time, $time0, $x, $y, $currentMoment->id);
		}
		//return the person
		return array('person'=>$person,'action'=>$action);
	}

}