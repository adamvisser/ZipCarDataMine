<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ziptopia extends Model
{
	protected $table = 'products';

	protected $primaryKey = 'id';

	public $timestamps = False;

	protected $connection = 'mysql';

	protected $fillable = ['client_id','start_time','end_time'];

	protected $guarded = ['id'];

	public function  people()
    {
        return $this->hasMany('App\People');
    }
}
