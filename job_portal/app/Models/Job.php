<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function owner(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function applicants() {
        return $this->belongsToMany(User::class, 'job_applicants')->withTimestamps();
    }
}
