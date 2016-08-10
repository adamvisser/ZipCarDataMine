<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Hash;
use Carbon\Carbon;

class JSONSession extends Model
{
    protected $table = 'JSONSession';
    public $timestamps = True;
	protected $fillable = ['user_id','token','expires_at','created_at', 'updated_at', 'active'];
    protected $guarded = ['id'];
    protected $casts = [
		'expires_at'=>'datetime',
	];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public static function startNewSession($userID){
    	$session = new JSONSession;
        $session->user_id = $userID;
        //generate a random string then hashing it. this toekn is acting as both public and private key, should be just a public one, but thats later
        $session->token = Hash::make(str_random(8));
        $now = Carbon::now();
        $session->expires_at = $now->addWeek();
        $session->active = True;
        $session->save();
        //I should really go through and set up the events to expire this token
        return $session;
    }

    public static function sessionFromToken($token){
        return JSONSession::with('user')->where('token', $token)->first();
    }

    public static function tokenFromUser($userID){
        //assuming that there will always be a token here is bad
        return JSONSession::where('user_id', $userID)->orderby('expires_at', 'desc')->first()->token;
    }
}
