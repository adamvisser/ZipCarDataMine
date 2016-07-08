<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ziptopia extends Model
{
	protected $table = 'ziptopias';

	protected $primaryKey = 'id';

	public $timestamps = False;

	protected $connection = 'mysql';

	protected $fillable = ['client_id','start_time','end_time'];

	protected $guarded = ['id'];

	public function  people()
    {
        return $this->hasMany('App\People');
    }

    public function  startMoment()
    {
        return $this->belongsTo('App\Moment','start_time');
    }

    public function  endMoment()
    {
        return $this->belongsTo('App\Moment','end_time');
    }

    public static function createZipTopinstance($clientID, $currentMomentID)
    {
        return Ziptopia::create(['client_id'=>$clientID, 'start_time'=>$currentMomentID]);
    }
}
