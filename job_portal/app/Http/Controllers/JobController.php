<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobApplicant;
use App\Models\User;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(){
       return Job::where('user_id', auth()->id())->latest()->paginate(10);
    }

    public function allJobs(){
       return Job::with('owner:id,businessName')->where('status', 1)->latest()->paginate(12);
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

        if(auth()->user()->type == 'company'){
            return response(['status' => 'failed', 'message' => 'You are not allowed to apply for a job!'], 422);
        }else{
            if(!auth()->user()->cv){
                return response(['status' => 'failed', 'message' => 'Please upload your CV!', 'type' => 'update_cv'], 422);
            }
        }

        if($request->filled('token') && $request->filled('jobID')){
            $decoded = $this->decodeJWT($request->token);

            $user = User::where('email', $decoded->email)->first();
            $job = Job::find($request->jobID);

            if($user && $job){
                $alreadyApplied = JobApplicant::where('user_id', $user->id)->where('job_id', $job->id)->exists();
                if($alreadyApplied){
                    return response(['status' => 'failed', 'message' => 'Already applied!'], 422);
                }
                $user->jobs()->attach($job->id);
                return ['status' => 'success'];
            }
        }
        return response(['status' => 'failed', 'message' => 'Something went wrong!'], 422);
    }

    public function applications($jobID){
        return JobApplicant::where('job_id', $jobID)->with('user')->latest()->paginate(10);
    }
}
