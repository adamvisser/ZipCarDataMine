<?php

namespace App;

use Hash;

//for the default auth
//use Illuminate\Foundation\Auth\User as Authenticatable;
//for my JWT auth
use App\Plugins\JWT\User as Authenticatable;


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
