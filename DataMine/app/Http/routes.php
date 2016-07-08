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

Route::post('/submitdata', 'DataSubmissionController@submitData');

Route::get('/check/people','DataSubmissionController@checkPeople');

Route::get('/check/waiting','DataSubmissionController@checkWaiting');

Route::get('/check/walking','DataSubmissionController@checkWalking');

Route::get('/check/buildings','DataSubmissionController@checkBuildings');