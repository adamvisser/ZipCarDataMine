<?php

namespace App;

use Hash;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fullname', 'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function jsonSessions()
    {
        return $this->hasMany('App\JSONSession');
    }

    public static function getUserCredentials($userName, $password){
        //search based off of the username
        $user = User::where('username', $userName)->first();
        if($user){
            //check if the password in the user table matches the hashed version of what was passed in
            if (Hash::check($password, $user->password)) {
                // The passwords match...
               return $user;
            }
        }
        return false;
    }

    public static function newUserCredentials($credentials, $password){
        //search based off of the username
        $user = User::where('username', $userName)->first();
        if($user){
            //check if the password in the user table matches the hashed version of what was passed in
            if (Hash::check($password, $user->password)) {
                // The passwords match...
               return $user;
            }
        }
        return false;
    }

    public static function emptyUserCredentials(){
        return [
            'username'=>'',
            'fullname'=>'',
            'email'=>'',
            'userid'=>0,
            'token'=>'',
            'errors'=>true,
        ];;
    }
}
