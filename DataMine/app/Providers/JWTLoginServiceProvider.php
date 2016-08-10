<?php

namespace App\Providers;

use Auth;
use App\Plugins\JWT\JWTUserProvider;
use Illuminate\Support\ServiceProvider;

class JWTLoginServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //for some reason since this is just a service provider, and not needed for app wide DI, we dont camel case it?
        //not sure why, but following the laravel standards
        Auth::provider('jwt', function($app, array $config) {
            // Return an instance of Illuminate\Contracts\Auth\UserProvider...
            return new JWTUserProvider();
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
