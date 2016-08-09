<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('buildings')->insert([
			'name' => 'A',
			'x' =>  '15',
			'y' => '16',
		]);

		DB::table('buildings')->insert([
			'name' => 'B',
			'x' =>  '5',
			'y' => '10',
		]);

		DB::table('buildings')->insert([
			'name' => 'C',
			'x' =>  '23',
			'y' => '2',
		]);


		DB::table('buildings')->insert([
			'name' => 'D',
			'x' =>  '23',
			'y' => '18',
		]);

		DB::table('buildings')->insert([
			'name' => 'E',
			'x' =>  '17',
			'y' => '20',
		]);

		DB::table('buildings')->insert([
			'name' => 'F',
			'x' =>  '2',
			'y' => '23',
		]);

		DB::table('buildings')->insert([
			'name' => 'G',
			'x' =>  '16',
			'y' => '10',
		]);

		DB::table('users')->insert([
				'fullname'=>'Mainz Brady Group', 'username'=>'MBG', 'email'=>'mperkins@mbg.com', 'password'=>Hash::make('adam-does-challenges'),
			]);

		DB::table('users')->insert([
				'fullname'=>'CBS Interactive', 'username'=>'CBSI', 'email'=>'notgiven@cbs.com', 'password'=>Hash::make('adam-does-challenges'),
			]);
    }
}
