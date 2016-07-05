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
		$exists = Moment::where('milliseconds',  $time)->get()->first();
		if ($exists) {
			return $exists;
		}
		return Moment::create(['milliseconds'=>$time]);
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
