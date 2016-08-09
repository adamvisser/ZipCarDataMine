<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//use Auth;
use Hash;
use App\User;
use App\JSONSession;

class UserController extends Controller
{
	//
	public function login(Request $request){
		$jsonData = $request->json()->all();
		$responseArray = [
			'userName'=>'',
			'fullName'=>'',
			'user_id'=>'',
			'token'=>'',
			'status'=>1,
		];
		$password = '';
		if (array_key_exists('username', $jsonData)) {
			$responseArray['userName'] = $jsonData['username'];
		}
		if (array_key_exists('password', $jsonData)) {
			$password = $jsonData['password'];
		}

		//return a bad status if no data was submitted
		if ($responseArray['userName'] == '' && $password == '') {
			return response()->json($responseArray);
		}
		//trying to cut down on number of mysql selects
		$userData = User::isValidUsernamePassword($responseArray['userName'], $password);
		if($userData){
			//now we can actually create a 'session', this shouldnt be a new one all the time though... in the future eh
			$sessionData = JSONSession::startNewSession($userData->id);
			$responseArray['username'] = $userData->username;
			$responseArray['fullname'] = $userData->fullname;
			$responseArray['user_id'] = $userData->id;
			$responseArray['token'] = $sessionData->token;
			$responseArray['errors'] = 0;
		}
		//always return the same array
		return response()->json($responseArray);
	}
}
