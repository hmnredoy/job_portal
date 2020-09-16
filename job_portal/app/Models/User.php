<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'skills' => 'array',
    ];

    /*public function jobs(){
        $this->hasManyThrough(Job::class, JobApplicant::class);
    }*/

    public function jobs()
    {
        return $this->belongsToMany(Job::class, 'job_applicants')->withTimestamps();
    }

/*
    public function appliedJobs()
    {
        return $this->belongsToMany('App\Models\Job')
            ->using('App\Models\JobApplicant');
    }*/
}
