<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;


use App\Moment;
use App\Ziptopia;
use App\People;


class SubmitDataTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testSimpleSubmit()
    {
    	$personExample = [
    					'destination'=>"D",
						'img'=>"people15",
						'name'=>"mike12802",
						'origin'=>"E",
						'time'=>12,
						'time0'=>61,
						'x'=>20,
						'y'=>20
    				];
    	$this->json('POST', '/submitdata', [
    			'turnNumber' =>0, 
    			'clientID' => 1467960390, 
    			'currentTime' => 1467960391, 
    			'peoples' => [$personExample,$personExample,$personExample,$personExample]
    		])->seeJson([
				'turnNumber' => 0,
				'clientID '=>1467960390,
			]);
    }

    public function testMomentByTime(){
    	Moment::getByTime(1467960391);
    	$this->seeInDatabase('moments', ['milliseconds' => 1467960391]);
    }

    public function testCreateZipTopInstance(){
    	Ziptopia::createZipTopinstance(1467960391, 1);
    	$this->seeInDatabase('ziptopias', ['milliseconds' => 1467960391]);
    }

    public function createTestPerson()
    {
    	$test = People::createOrRetrieve(1, 1467960391, 'd', "mike12802", "E", 12, 61, 0, 20, 20);
    	$this->seeInDatabase('people', ['name' => "mike12802", 'ziptopia_id' => 1467960391])->seeInDatabase('walkings',[
				'moment_id'=> 1,
				'people_id'=> $test->id,
				'x'=> 20,
				'y'=> 20,]);
    }
}
