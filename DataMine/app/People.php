<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class People extends Model
{
	protected $table = 'products';

	protected $primaryKey = 'id';

	public $timestamps = False;

	protected $connection = 'mysql';

	protected $fillable = ['name','ziptopia_id'];

	protected $guarded = ['id'];

	public function ziptopia()
	{
		return $this->belongsTo('App\Ziptopa');
	}

	public function  waitingAts()
    {
        return $this->hasMany('App\Waiting');
    }

    public function  walkingTos()
    {
        return $this->hasMany('App\Walking');
    }

}
