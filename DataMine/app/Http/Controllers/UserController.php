<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use Auth;
use Hash;
use App\User;
use App\JSONSession;

class UserController extends Controller
{
	//
	public function login(Request $request){
		$jsonData = $request->json()->all();
		$responseArray = User::emptyUserCredentials();
		$password = '';
		if (array_key_exists('username', $jsonData)) {
			$responseArray['username'] = $jsonData['username'];
		}
		if (array_key_exists('password', $jsonData)) {
			$password = $jsonData['password'];
		}

		//return a bad status if no data was submitted
		if ($responseArray['username'] == '' && $password == '') {
			return response()->json($responseArray);
		}
		//trying to cut down on number of mysql selects
		if (Auth::attempt(['username' => $responseArray['username'], 'password' => $password])) {
				$userData = Auth::user();
				$responseArray['fullname'] = $userData->fullname;
				$responseArray['user_id'] = $userData->id;
				$responseArray['token'] = JSONSession::tokenFromUser($userData->id);
				$responseArray['errors'] = false;
        }
		
		//always return the same array, this way the username wont change on the front end. no way to tell if its a legit username or not. security-ish.
		return response()->json($responseArray);
	}


	public function register(Request $request){
		$jsonData = $request->json()->all();
		$responseArray = User::emptyUserCredentials();
		$password = '';
		if (array_key_exists('username', $jsonData)) {
			$responseArray['username'] = $userName;
		}
		if (array_key_exists('password', $jsonData)) {
			$password = $jsonData['password'];
		}
		if (array_key_exists('fullname', $jsonData)) {
			$responseArray['fullname'] = $jsonData['fullname'];
		}
		if (array_key_exists('email', $jsonData)) {
			$responseArray['email'] = $jsonData['email'];
		}
		$responseArray = User::newUserCredentials($responseArray['username'], $password);
	}
}
