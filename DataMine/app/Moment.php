<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Moment extends Model
	protected $table = 'products';

	protected $primaryKey = 'id';

	public $timestamps = False;

	protected $connection = 'mysql';

	protected $fillable = ['milliseconds'];

	protected $guarded = ['id'];

	public function getByTime($time){
		//milliseconds would be too much of a spread... for now.
		$time = $time/1000;
		$time = round($time, 0, PHP_ROUND_HALF_DOWN);
		$exists = Moment::where('seconds',  $time)->get()->first();
		if ($exists) {
			return $exists;
		}
		return Moment::create(['seconds'=>$time]);
	}

	public function  ziptopiaStarts()
    {
        return $this->hasMany('App\People');
    }

    public function  ziptopiaEnds()
    {
        return $this->hasMany('App\People');
    }
}
