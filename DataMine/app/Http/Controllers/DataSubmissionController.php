<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Ziptopia;
use App\Moment;
use App\Waiting;
use App\Walking;
use App\Person;
use App\Building;

class DataSubmissionController extends Controller
{

	public function submitData(Request $request){
		//well need the turn number to know what to do with the ziptopia
		$turnNumber = $request->input('turn-number');
		//well need the client id (millisecond of code start time) to know which ziptopia
		$clientID = $request->input('client-id');
		//well need the current millisecond of that turn to get the proper moment association
		$currentTime = Moment::getByTime($request->input('current-time'));
		if ($turnNumber == 0) {
			//everything is just begining
		} else if ($turnNumber == 999) {
			//everything is ending
		} else {
			//in the middle of everything
		}

		return 'returning useless info for now';
	}

	public function checkData(){

		return json_encode(People::take(30)->get());
	}
}
