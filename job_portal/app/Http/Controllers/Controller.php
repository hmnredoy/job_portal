<?php

namespace App\Http\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function makeToken($payload)
    {
        return JWT::encode($payload, env('SECRET_KEY', 'ABC-SECRET-123'));
    }

    public static function decodeJWT($token){
        return JWT::decode($token, env('SECRET_KEY', 'ABC-SECRET-123'), array('HS256'));
    }

    public static function getUser($token){
        $decoded = self::decodeJWT($token);
        return $decoded ? User::where('email', $decoded->email)->first() : null;
    }
}
