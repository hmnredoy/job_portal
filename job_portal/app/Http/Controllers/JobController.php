<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(){
       return Job::latest()->paginate(10);
    }

    public function allJobs(){
       return Job::where('status', 1)->latest()->paginate(10);
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'sometimes|max: 1500',
            'salary' => 'required|regex:/^\d+(\.\d{1,2})?$/',
            'location' => 'required',
            'country' => 'required',
            'status' => 'sometimes',
        ], ['salary.regex' => 'Salary is not well formatted.']);

        $request->merge(['status' => $request->status ? 1 : 0]);
        $request->merge(['user_id' => auth()->id()]);
        return Job::create($request->input()) ? ['status' => 'success'] : response(['status' => 'failed'], 422);
    }

    public function changeStatus(Request $request){
        $job = Job::find($request->jobID);
        if($job){ return $job->update(['status' => !$job->status]) ? ['status' => 'success'] : response(['status' => 'failed'], 422); }
        return response(['status' => 'failed', 'message' => 'Job doesn\'t exist!'], 422);
    }

    public function apply(Request $request){
        dd($request->all());
    }
}
