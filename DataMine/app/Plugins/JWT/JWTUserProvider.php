<?php

namespace App\Plugins\JWT;

use Hash;
use Illuminate\Contracts\Auth\UserProvider;
use App\User;
use App\JSONSession;
use Illuminate\Contracts\Auth\Authenticatable;
/**
* 
*/
class JWTUserProvider implements UserProvider
{
	
	public function retrieveById($identifier){
		$session = JSONSession::sessionFromToken($identifier);
		//I have to get deeper into eloquent....
		return $session->user;
	}
    
    public function retrieveByToken($identifier, $token){
		//this is out of scope for now
		return new User;
	}
    
    public function updateRememberToken(Authenticatable $user, $token){
		//this is out of scope for now
		return new User;
	}
    
    public function retrieveByCredentials(array $credentials){
		$user = User::where('username',$credentials['username'])->first();
    	return $user;
	}
    
    public function validateCredentials(Authenticatable $user, array $credentials){
    	//make sure what is being passed in is "for the most part" ok
		if(count($user)){
			if($user->username == $credentials['username']){
				//check if the password in the user table matches the hashed version of what was passed in
	            if (Hash::check($credentials['password'], $user->password)) {
	                // The passwords match...
	                //make sure a session is properly started for the token to be used later
	                JSONSession::startNewSession($user->id);
	                return true;
	            }
			}
        }
        return false;
	}
}