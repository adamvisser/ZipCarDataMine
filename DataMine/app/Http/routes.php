<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

//do you even comment adam, as this line is important
Route::post('/submitdata', 'DataSubmissionController@submitData');


//we will want to know which building is being traveled to the most, and from which building
Route::get('/api/graphs/destination/treemap/{startTurn?}/{endTurn?}','DataSubmissionController@checkPeople');
//we will want to know which building is being waited at the longest, and for what building
Route::get('/api/graphs/origin/treemap/{startTurn?}/{endTurn?}','DataSubmissionController@checkPeople');


Route::match(['get', 'post'],
	'/login',
	'MainController@login');
