<?php

namespace App\Plugins\JWT;

use Illuminate\Database\Eloquent\Model;
use App\Plugins\JWT\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

/**
* 
*/
class User extends Model implements
    AuthenticatableContract
{
	Use Authenticatable;
}