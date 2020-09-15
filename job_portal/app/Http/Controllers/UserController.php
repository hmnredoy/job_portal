<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use \Firebase\JWT\JWT;

class UserController extends Controller
{

    public function getUser(Request $request)
    {
        $decoded = JWT::decode($request->token, env('SECRET_KEY', 'ABC-SECRET-123'), array('HS256'));

        $email = $decoded->email;

        $user = User::where('email', $email)->first();

        dd($decoded);
    }
}
