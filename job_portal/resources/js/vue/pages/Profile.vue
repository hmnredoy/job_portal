<template>
    <div>

    <navbar/>

    <div class="container">
        <div class="card">
            <div class="card-body d-flex justify-content-center">

                <form @submit.prevent="register" class="col-md-6">
                    <div class="text-center mb-4">
                        <h1 class="h3 mb-3 font-weight-normal">Profile</h1>
                    </div>
                    <div class="profile-image-wrapper">
                        <img :src="profileImage" alt="profile-image" class="profile-image" width="100">
                    </div>

                    <div class="form-group">
                        <label for="pPhoto">Profile Photo</label>
                        <input type="file" class="form-control-file" id="pPhoto" @change="setPhoto($event)">
                    </div>

                    <div class="form-group">
                        <input type="text" v-model="user.firstName" class="form-control" placeholder="First Name" autofocus>
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="user.lastName" class="form-control" placeholder="Last Name">
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="user.businessName" class="form-control" placeholder="Business Name">
                    </div>

                    <div class="form-group">
                        <input type="text" v-model="profile.skills" class="form-control" placeholder="Skills">
                    </div>

                    <div class="profile-image-wrapper mb-2">
                        <label for="cv">Select CV</label>
                        <input type="file" class="form-control-file" id="cv">
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

                    <button class="btn btn-lg btn-primary btn-block" type="submit">Update</button>

                    <div v-if="errors" class="alert alert-danger mt-4 rounded font-bold mb-4 shadow-lg">
                        <div v-for="(v, k) in errors" :key="k">
                            <p v-for="error in v" :key="error" class="text-sm">
                            {{ error }}
                            </p>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>

    </div>
</template>

<script>
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
                    password: null
                },
                profile: {
                    image: null,
                    skills: null
                },
                errors: null,
                profileImage: '/storage/images/profile.png'
            }
        },
        methods: {
            setPhoto(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.profileImage = reader.result
                }
                reader.readAsDataURL(file);
            },
            getUserData(){
                 axios.post('/user', {token: localStorage.getItem("token")})
                .then((res) => {

                })
                .catch((e) => {
                    this.errors = e.response.data.errors
                })
            }
        },
        mounted() {
            this.getUserData()
        },
    }
</script>

<style scoped>

</style>
