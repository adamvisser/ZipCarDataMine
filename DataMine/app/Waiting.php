<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Waiting extends Model
{
	protected $primaryKey = 'id';

	public $timestamps = False;

	protected $connection = 'mysql';
	
	protected $table = 'waitings';

	protected $fillable = ['waiting_at','waiting_for','moment_id','people_id', 'turn_number', 'person_time','person_time0', 'x', 'y'];


    public function waitingFor()
	{
		return $this->belongsTo('App\Building', 'waiting_at');
	}

	public function waitingAt()
	{
		return $this->belongsTo('App\Building', 'waiting_for');
	}

	public function moment(){
		return $this->belongsTo('App\Moment');
	}

	public function person(){
		return $this->belongsTo('App\People');
	}

	public static function setupData($personID, $origin, $turnNumber, $destination, $time, $time0, $x, $y, $momentID)
	{
		return Walking::create(
				'waiting_for'=> $destination,
				'waiting_at'=> $origin,
				'moment_id'=> $momentID,
				'people_id'=> $personID,
				'turn_number'=> $turnNumber,
				'person_time'=> $time,
				'person_time0'=> $time0,
				'x'=> $x,
				'y'=> $y,
			);
	}
}
