<template>
    <div>
    <navbar :loginStatus="true"/>
    <div class="container">
        <div class="card">
            <div class="card-body d-flex justify-content-center">

                <div class="col-md-6">
                    <div class="text-center mb-4">
                        <h1 class="h3 mb-3 font-weight-normal">Profile</h1>
                    </div>
                    <div class="profile-image-wrapper" v-if="user.type === 'applicant'">
                        <img :src="profileImage" alt="profile-image" class="profile-image" width="100">
                    </div>

                    <div class="form-group" v-if="user.type === 'applicant'">
                        <label for="pPhoto">Profile Photo</label>
                        <input type="file" class="form-control-file" id="pPhoto" @change="setPhoto($event)">
                    </div>

                    <div class="form-group">
                        <input type="text" v-model="user.firstName" class="form-control" placeholder="First Name" autofocus>
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="user.lastName" class="form-control" placeholder="Last Name">
                    </div>
                    <div class="form-group" v-if="user.type === 'company'">
                        <input type="text" v-model="user.businessName" class="form-control" placeholder="Business Name">
                    </div>

                    <div class="form-group" v-if="user.type === 'applicant'">
                        <label>Skills:</label>
                        <div style="display: inline-block;">
                            <span class="text-muted" v-for="(skill, index) in user.skills" :key="index">
                                <span class="badge badge-pill">{{skill}}</span>
                            </span>
                            <button class="btn btn-sm btn-light" @click="user.skills = []">Clear</button>
                        </div>

                        <input type="text" @keyup.enter.prevent="addSkill($event)" class="form-control" placeholder="Write skill and press Enter">
                    </div>

                    <div class="profile-image-wrapper mb-2" v-if="user.type === 'applicant'">
                        <label for="cv">Select CV</label>
                        <input type="file" class="form-control-file" id="cv" @change="setCV($event)">
                        <br>
                        <a :href="user.cv" target="_blank" v-if="!cvDirty && user.cv">Download CV</a>
                    </div>

                    <hr>
                    <button class="btn-block btn btn-default mb-2 float-right" type="button" data-toggle="collapse"
                    data-target="#emailPassword" aria-expanded="false">
                        Update Email/Password
                    </button>
                    <div class="collapse mb-4" id="emailPassword">
                        <div class="form-group">
                            <input type="text" v-model="user.email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input type="password" v-model="user.password" class="form-control" placeholder="Password">
                        </div>
                    </div>

                    <button class="btn btn-lg btn-primary btn-block" @click="saveData">Update</button>

                    <div v-if="errors" class="alert alert-danger mt-4 rounded font-bold mb-4 shadow-lg">
                        <div v-for="(v, k) in errors" :key="k">
                            <p v-for="error in v" :key="error" class="text-sm">
                            {{ error }}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    </div>
</template>

<script>
    import {helper} from "../helper";

    export default {
        name: "Profile",
        data() {
            return {
                user: {
                    type: null,
                    firstName: null,
                    lastName: null,
                    businessName: null,
                    email: null,
                    password: null,
                    image: null,
                    cv: null,
                    skills: []
                },
                errors: null,
                profileImage: null,
                skill: null,
                token: null,
                imageDirty: false,
                cvDirty: false,

            }
        },
        methods: {
            addSkill(e){
                this.user.skills.push(e.currentTarget.value)
                e.currentTarget.value = null
            },
            setPhoto(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.profileImage = reader.result
                }
                reader.readAsDataURL(file);

                this.imageDirty = true
                this.user.image = file
            },
            setCV(e){
                this.cvDirty = true
                this.user.cv = e.target.files[0];
            },
            saveData(){
                let data = new FormData();
                if(this.user.type === 'applicant'){
                    let image = this.user.image
                    let cv = this.user.cv

                    this.imageDirty ? data.append('image', image, image.name) : ''
                    this.cvDirty ? data.append("cv", cv) : ''
                }

                data.append('token', this.token)

                for ( let key in this.user ) {
                    data.append(key, this.user[key]);
                }

                let settings = { headers: { 'content-type': 'multipart/form-data' } }

                axios.post('/user', data, settings)
                    .then((res) => {
                        if(res.data.status === 'success'){
                            helper.setToLocal('token', res.data.token)
                            alert('Updated!')
                            this.getUser()
                        }
                    })
                    .catch((e) => {
                        if(typeof e.response.data.errors !== 'undefined'){
                            this.errors = e.response.data.errors
                        }else{
                            alert("Please try again!")
                        }
                    })
            },
            getUser(){
                this.token = helper.getFromLocal('token')
                if(this.token){
                    axios.get('/user?token='+this.token)
                        .then(response => {
                            response.data.skills = !response.data.skills ? [] : response.data.skills.split(',')
                            Object.assign(this.user, response.data)
                            this.profileImage = response.data.image ?? '/storage/images/profile.png'
                        });
                }else{
                    helper.logout()
                }
            }
        },
        mounted() {
            this.getUser()
        },
    }
</script>

<style scoped>

</style>
