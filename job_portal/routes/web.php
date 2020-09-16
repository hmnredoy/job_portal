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




Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);
Route::post( 'logout',  [AuthController::class, 'logout']);
Route::get( 'verify',   [AuthController::class, 'verifyUser']);

Route::get('user',      [UserController::class, 'index']);
Route::patch('user',    [UserController::class, 'update']);

Route::post('create-job',         [JobController::class, 'store']);
Route::get( 'jobs',               [JobController::class, 'index']);
Route::get( 'all-jobs',           [JobController::class, 'allJobs']);
Route::post('change-job-status',  [JobController::class, 'changeStatus']);
Route::post('apply',              [JobController::class, 'apply']);
Route::get( 'applications/{id}',       [JobController::class, 'applications']);

Route::get('{path}', function () {
    return view('index');
})->where('path', '.*');
