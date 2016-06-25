<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Waiting extends Model
{
	protected $table = 'waitings';
	protected $fillable = ['total_waiting','remaining_waiting','waiting_at','waiting_for','moment_id','people_id',];
    public function waitingFor()
	{
		return $this->belongsTo('App\Building', 'waiting_for','name');
	}

	public function waitingAt()
	{
		return $this->belongsTo('App\Building', 'waiting_at','name');
	}

	public function moment(){
		return $this->belongsTo('App\Moment');
	}

	public function moment(){
		return $this->belongsTo('App\People');
	}
}
