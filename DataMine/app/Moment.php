<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Moment extends Model{
	protected $table = 'moments';

	protected $primaryKey = 'id';

	public $timestamps = False;

	protected $connection = 'mysql';

	protected $fillable = ['milliseconds'];

	protected $guarded = ['id'];

	public static function getByTime($time){
		return Moment::firstOrCreate(['milliseconds'=>$time]);
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
