



<?php

namespace App\Providers;

use Auth;
use App\Extensions\JWT\JWTUserProvider;
use Illuminate\Support\ServiceProvider;

class JWTLoginServiceProvider extends ServiceProvider
{
    /**
     * Register bindings in the container.
     *
     * @return void
     */
    public function register()
    {
        //dont need this just yet....
        /*but its where we would create our JWT object hashing singleton
        $this->app->singleton('JWTHasher', function ($app) {
            return new Connection(config('riak'));
        });
        Dependency Injection! So Awesome!!!!*/
    }
}






