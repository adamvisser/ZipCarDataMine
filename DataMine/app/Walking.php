<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Walking extends Model
{
	protected $table = 'products';

	protected $primaryKey = 'id';

	public $timestamps = False;

	protected $connection = 'mysql';

	protected $fillable = ['person_time','person_time0'];

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
}
