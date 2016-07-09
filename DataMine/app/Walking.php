<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Walking extends Model
{
	protected $table = 'walkings';

	protected $primaryKey = 'id';

	public $timestamps = False;

	protected $connection = 'mysql';

	protected $fillable = ['walking_to','walking_from','moment_id','people_id', 'turn_number', 'person_time','person_time0', 'x', 'y'];

	protected $guarded = ['id'];

	public function walkingTo()
	{
		return $this->belongsTo('App\Building', 'walking_to');
	}

	public function walkingFrom()
	{
		return $this->belongsTo('App\Building', 'walking_from');
	}

	public function moment(){
		return $this->belongsTo('App\Moment');
	}

	public function person(){
		return $this->belongsTo('App\People');
	}

	public static function setupData($personID, $origin, $turnNumber, $destination, $time, $time0, $x, $y, $momentID)
	{
		return Walking::create([
				'walking_to'=> $destination,
				'walking_from'=> $origin,
				'moment_id'=> $momentID,
				'people_id'=> $personID,
				'turn_number'=> $turnNumber,
				'person_time'=> $time,
				'person_time0'=> $time0,
				'x'=> $x,
				'y'=> $y,
			]);
	}
}
