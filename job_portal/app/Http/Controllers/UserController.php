<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use \Firebase\JWT\JWT;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{

    public function index(Request $request)
    {
        return $this->getUser($request->token)
            ->only('firstName',
            'lastName',
            'email',
            'image',
            'cv',
            'type',
            'skills',
            'businessName'
            );
    }

    public function update(Request $request)
    {
        $user = $this->getUser($request->token);

        $data = array_map(function ($el) {
            return $el == "null" || $el == 'undefined' ? null : $el;
        }, $request->all());

        $request = new Request($data);

        $rules = [
            'type' => 'required',
            'firstName' => 'required',
            'lastName' => 'required',
            'businessName' => 'required_if:type,company',
            'email' => ['required', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable',
            'skills' => 'sometimes|nullable'
        ];

        File::isFile($request->image) ? $rules['image'] = 'sometimes|nullable|image|max:1024' : null;
        File::isFile($request->cv) ? $rules['cv'] = 'sometimes|nullable|mimes:doc,docx,pdf|max:1024' : null;

        $request->validate($rules);

        $request->merge(['password' => $request->password ? Hash::make($request->password) : null]);

        if(File::isFile($request->image)){
            $imagePath = $request->image ?
                '/storage/'.str_replace('public', '', $request->image->store('public/images')) : null;
            $request->merge(['image' => $imagePath]);
        }

        if(File::isFile($request->cv)){
            $cvPath = $request->cv ?
                '/storage/'.str_replace('public', '',$request->cv->store('public/cv')) : null;
            $request->merge(['cv' => $cvPath]);
        }


        $dataToBeUpdated = array_filter($request->all(), function ($el){
            return $el;
        });
        $updated = $user->update($dataToBeUpdated);

        $user = User::find($user->id)->only('firstName',
            'lastName',
            'email',
            'image',
            'cv',
            'type',
            'skills',
            'businessName'
        );

        unset($user['password'], $user['id']);
        return $updated ? ['status' => 'success', 'user' => $updated, 'token' => $this->makeToken($user)] : response(['status' => 'failed'], 422);
    }

    public function appliedJobs(){
        return auth()->user()->jobs()->paginate(10);
    }
}
