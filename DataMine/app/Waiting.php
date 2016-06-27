<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Waiting extends Model
{
	protected $table = 'waitings';
	protected $fillable = ['waiting_at','waiting_for','moment_id','people_id', 'turn_number', 'person_time','person_time0'];
    public function waitingFor()
	{
		return $this->belongsTo('App\Building');
	}

	public function waitingAt()
	{
		return $this->belongsTo('App\Building');
	}

	public function moment(){
		return $this->belongsTo('App\Moment');
	}

	public function person(){
		return $this->belongsTo('App\People');
	}
}
