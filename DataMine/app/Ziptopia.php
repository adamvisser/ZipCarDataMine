<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Log;

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

    public static function loadZipTopinstance($ziptopiaID)
    {
        Log::info('ziptopia loading: '.$ziptopiaID);
        $ziptopia =  Ziptopia::find($ziptopiaID);
        Log::info('ziptopia created: '.$ziptopia);
        return $ziptopia;
    }

    public static function endZipTopinstance($ziptopiaID, $currentMomentID)
    {
        $ziptopia = Ziptopia::where('id',$ziptopiaID)->update(['end_time' => $currentMomentID]);
        if ($ziptopia == 1) {
            //we only want to return a ziptopia if there is a SINGLE ziptopia with this unique combination
            return Ziptopia::loadZipTopinstance($clientID, $ziptopiaID);
        }else{
            //I am putting this here because this is the best place to put a "o holy cow this whole data run is crap"  function call... for now...
        }
        return false;
    }
}
