<?php

namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public static function decodeJWT($token){
        return JWT::decode($token, env('SECRET_KEY', 'ABC-SECRET-123'), array('HS256'));
    }
}
