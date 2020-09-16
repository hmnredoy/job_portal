<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use \Firebase\JWT\JWT;

class UserController extends Controller
{

    public function index(Request $request)
    {
        $decoded = $this->decodeJWT($request->token);
        return User::where('email', $decoded->email)
            ->first()
            ->only('firstName',
            'lastName',
            'email',
            'image',
            'type',
            'businessName'
            );
    }

    public function update(Request $request)
    {
        dd($request->all());
        $decoded = $this->decodeJWT($request->token);
        $user = User::where('email', $decoded->email)->first();

        dd($user);
    }
}
