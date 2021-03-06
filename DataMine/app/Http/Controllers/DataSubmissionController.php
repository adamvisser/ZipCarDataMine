<?php

namespace App\Http\Controllers;

use Log;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Ziptopia;
use App\Moment;
use App\Waiting;
use App\Walking;
use App\People;
use App\Building;


/*
{
	turn-number:0-999,
	client-id:int milisecond of when the user started, its not the best but works
	current-time:milisecond time of when user started turn
	peoples:[
			{
				destination:"D",
				img:"people9",
				name:"mike12793",
				origin:"B",
				time:9,
				time0:83,
				x:21,
				y:16
			},
			{
				destination:"D",
				img:"people9",
				name:"mike12793",
				origin:"B",
				time:9,
				time0:83,
				x:21,
				y:16
			},
		]
}
*/

class DataSubmissionController extends Controller
{

	    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('cors');
    }


	public function submitData(Request $request){
		$jsonData = $request->json()->all();
		//well need the turn number to know what to do with the ziptopia
		$turnNumber = $jsonData['turnNumber'];
		//well need the client id (millisecond of code start time) to know which ziptopia
		$clientID = $jsonData['clientID'];
		//well need the current millisecond of that turn to get the proper moment association
		$currentMoment = Moment::getByTime($jsonData['currentTime']);
		//we will need a list of all the peoples
		$peoplesRequest = $jsonData['peoples'];
		if ($turnNumber == 0) {
			//everything is just begining
			//create the ziptopia id
			$ziptopia = Ziptopia::createZipTopinstance($clientID, $currentMoment->id);

			if ($ziptopia) {
				$peoples = People::dataSubmit($currentMoment, $ziptopia, $turnNumber, $peoplesRequest);
				//ziptopia starting so make sure to set its start
				if ($peoples) {
					return response()->json([
						'ziptopiaID'=>$ziptopia->id,
					]);
				}
			}
			Log::info('turn ==0 ziptopia brok');
		} else if ($turnNumber == 999) {
			//everything is ending
			$ziptopiaID = $jsonData['ziptopiaID'];
			//load the ziptopia id
			if ($ziptopiaID > -1) {
				$ziptopia = Ziptopia::endZipTopinstance($ziptopiaID, $currentMoment);
				if ($ziptopia) {
					//for all the peoples, do their walking/waitings
					$peoples = People::dataSubmit($currentMoment, $ziptopia, $turnNumber, $peoplesRequest);
					if ($peoples) {
						return response()->json([
							'ziptopiaID'=>$ziptopia->id,
						]);
					}
			 	}
			}
			Log::info('turn ==999 ziptopia brok');
		} else if ($turnNumber >0 && $turnNumber < 999 ) {
			$ziptopiaID = $jsonData['ziptopiaID'];
			//load the ziptopia id
			if ($ziptopiaID > -1) {
				$ziptopia = Ziptopia::loadZipTopinstance($ziptopiaID);
				if ($ziptopia) {
					//for all the peoples, do their walking/waitings
					$peoples = People::dataSubmit($currentMoment, $ziptopia, $turnNumber, $peoplesRequest);
					if ($peoples) {
						return response()->json([
							'ziptopiaID'=>$ziptopia->id,
						]);
					}
					
				}
				Log::info('turn >0 ziptopia create brok');
			}
			Log::info('turn >0 ziptopia id passed in brok');
		}
		//if we are at this point then all is wrong!!!
		//I baked in an "o goodness all is wrong" flag to the ziptopiaID. for now....
		return response()->json([
			'ziptopiaID'=>-2,
		]);
	}
}
