<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Route::post('register',     [AuthController::class, 'register']);
Route::post('login',        [AuthController::class, 'login']);
Route::get('logout',        [AuthController::class, 'logout']);
Route::post('user',         [UserController::class, 'getUser']);
Route::post('create-job',   [JobController::class,  'store']);
Route::get('verify',        [AuthController::class, 'verifyUser']);
Route::get('jobs',          [JobController::class, 'index']);
Route::get('all-jobs',      [JobController::class, 'allJobs']);
Route::post('change-job-status', [JobController::class, 'changeStatus']);
Route::post('apply',        [JobController::class, 'apply']);

Route::get('{path}', function () {
    return view('index');
})->where('path', '.*');
