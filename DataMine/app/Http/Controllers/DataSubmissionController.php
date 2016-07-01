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
		$currentMoment = Moment::getByTime($request->input('current-time'));
		if ($turnNumber == 0) {
			//everything is just begining
			//create the ziptopia id
			$ziptopia = Ziptopia::createZipTopinstance($clientID, $currentMoment);
			//create all the peoples
			//for all the peoples, do their walking/waitings
		} else if ($turnNumber == 999) {
			//everything is ending
			//load the ziptopia id
			//get/create all the peoples
			//for all the peoples, do their walking/waitings
		} else {
			//in the middle of everything
			//load the ziptopia id
			//get/create all the peoples
			//for all the peoples, do their walking/waitings
		}

		return 'returning useless info for now';
	}

	public function checkPeople(){

		return json_encode(People::take(30)->get());
	}

	public function checkWaiting(){

		return json_encode(People::take(30)->get());
	}

	public function checkWalking(){

		return json_encode(People::take(30)->get());
	}
}
