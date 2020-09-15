<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use \Firebase\JWT\JWT;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $request->validate([
            'type' => ['required', Rule::in(['company', 'applicant'])],
            'firstName' => 'required|max: 255|alpha',
            'lastName' => 'required|max: 255|alpha',
            'businessName' => 'required_if:type, company|max: 255',
            'email' => 'required|max: 255|email|unique:users,email',
            'password' => 'required|min: 6|max: 255',
        ]);

        $request->merge(['password' => Hash::make($request->password)]);

        $user = User::create($request->input());
        Auth::login($user);
        unset($user['password'], $user['id']);
        return ['status' => 'success', 'token' => $this->makeToken($user)];
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|max: 255|email',
            'password' => 'required|min: 6|max: 255',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            unset($user['id']);
            return ['status' => 'success', 'token' => $this->makeToken($user)];
        }else{
            return response(['errors' => ['password' => ['Wrong credentials!']]], 422);
        }
    }

    protected function makeToken($payload)
    {
        return JWT::encode($payload, env('SECRET_KEY', 'ABC-SECRET-123'));
    }
}
