<template>
    <div>

    <navbar/>

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
                                <span>{{skill}}, </span>
                            </span>
                        </div>

                        <input type="text" v-model="skill" @keydown.enter.prevent="addSkill" class="form-control" placeholder="Write skill and press Enter">
                    </div>

                    <div class="profile-image-wrapper mb-2" v-if="user.type === 'applicant'">
                        <label for="cv">Select CV</label>
                        <input type="file" class="form-control-file" id="cv" @change="setCV($event)">
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
                profileImage: '/storage/images/profile.png',
                skill: null,

            }
        },
        methods: {
            addSkill(){
                this.user.skills.push(this.skill)
                this.skill = null
            },
            setPhoto(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.profileImage = reader.result
                }
                reader.readAsDataURL(file);

                this.user.image = file
            },
            setCV(e){
                this.user.cv = e.target.files[0];
            },
            getUserData(){
                axios.get('/user?token=' + helper.getFromLocal("token"))
                    .then((res) => {
                        Object.assign(this.user, res.data)
                        console.log(res)
                    })
                    .catch((e) => {
                        this.errors = e.response.data.errors
                    })
            },
            saveData(){

                 let formData = new FormData();
                 let image = this.user.image.files[0] ?? null
                 let cv = this.user.cv.files[0] ?? null
                 formData.append("image", image);
                 formData.append("cv", cv);
                //
               //  let data = Object.assign(this.user, formData, {token: helper.getFromLocal("token")},{_method: 'patch'})

                console.log(formData)

                /*axios.post('/user',data,
                {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((e) => {
                        this.errors = e.response.data.errors
                    })*/
            }
        },
        mounted() {
            this.getUserData()
        },
    }
</script>

<style scoped>

</style>
