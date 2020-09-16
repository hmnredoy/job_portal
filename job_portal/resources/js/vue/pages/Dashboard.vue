<template>
    <div>

    <navbar/>

    <div class="container">
        <div class="card">
            <div class="card-body">
                <button class="btn btn-default mb-2" type="button" data-toggle="collapse"
                 data-target="#postedJobs" aria-expanded="false">
                    Posted Jobs
                </button>

                 <button class="btn btn-default mb-2" type="button" data-toggle="collapse"
                 data-target="#applications" aria-expanded="false">
                    Applications
                </button>

                 <button class="btn btn-success mb-2 float-right" type="button" data-toggle="collapse"
                 data-target="#createJob" aria-expanded="false">
                    Create Job +
                </button>

                <div class="collapse mb-2" id="createJob">
                    <div class="card card-body">
                        <form @submit.prevent="createJob">
                            <div class="form-group">
                                <label for="j_title">Job Title</label>
                                <input v-model="job.title" type="text" class="form-control" id="j_title" autofocus>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea v-model="job.description" class="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="Salary">Salary</label>
                               <currency-input v-model="job.salary" currency="৳" id="Salary"></currency-input>
                            </div>
                            <div class="form-group">
                                <label for="Location">Location</label>
                                <input v-model="job.location" type="text" class="form-control" id="Location">
                            </div>
                            <div class="form-group">
                                <label for="country">Country</label>
                                <select v-model="job.country" class="form-control" id="country">
                                    <option v-for="(country, index) in countries" :value="country.name">{{country.name}}</option>
                                </select>
                            </div>
                            <div class="form-group form-check">
                                <input v-model="job.status" type="checkbox" class="form-check-input" id="status">
                                <label class="form-check-label" for="status">Active</label>
                            </div>
                            <button type="submit" class="btn btn-success float-right">Save</button>
                        </form>
                        <Errors :errors="errors"></Errors>

                    </div>
                </div>

                <div class="collapse mb-2" id="postedJobs">
                    <div class="card">
                        <div class="card-header">
                            <h2>Job list</h2>
                        </div>
                        <div class="card-body table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">#ID</th>
                                    <th scope="col">title</th>
                                    <th scope="col">description</th>
                                    <th scope="col">salary</th>
                                    <th scope="col">location</th>
                                    <th scope="col">country</th>
                                    <th scope="col">status</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="job in jobs.data" :key="job.id">
                                    <th scope="row">{{ job.id }}</th>
                                    <td>{{ job.title }}</td>
                                    <td>{{ job.description | str_limit(5) }}</td>
                                    <td>{{ job.salary }}</td>
                                    <td>{{ job.location }}</td>
                                    <td>{{ job.country }}</td>
                                    <td>{{ job.status | status }}</td>
                                    <td>
                                        <button class="btn btn-xs btn-success" v-if="!job.status" @click="changeJobStatus(job.id)">Activate</button>
                                        <button class="btn btn-xs btn-danger" v-else @click="changeJobStatus(job.id)">Deactivate</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <pagination :data="jobs" @pagination-change-page="getJobs"></pagination>

                        </div>
                    </div>
                </div>

                <div class="collapse" id="applications">
                    <div class="card card-body">
                        <div class="card">
                            <div class="card-header">
                                <h2>Applicant list</h2>
                            </div>
                            <div class="card-body table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#ID</th>
                                        <th scope="col">title</th>
                                        <th scope="col">description</th>
                                        <th scope="col">salary</th>
                                        <th scope="col">location</th>
                                        <th scope="col">country</th>
                                        <th scope="col">status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="job in jobs.data" :key="job.id">
                                        <th scope="row">{{ job.id }}</th>
                                        <td>{{ job.title }}</td>
                                        <td>{{ job.description | str_limit(5) }}</td>
                                        <td>{{ job.salary }}</td>
                                        <td>{{ job.location }}</td>
                                        <td>{{ job.country }}</td>
                                        <td>{{ job.status | status }}</td>
                                        <td>
                                            <button class="btn btn-xs btn-success" v-if="!job.status" @click="changeJobStatus(job.id)">Activate</button>
                                            <button class="btn btn-xs btn-danger" v-else @click="changeJobStatus(job.id)">Deactivate</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <pagination :data="jobs" @pagination-change-page="getJobs"></pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
    import countries from "../../libraries/countries";
    import {helper} from "../helper";

    export default {
        name: "Dashboard",
        data(){
          return {
              job: {
                  title: null,
                  description: null,
                  salary: 0,
                  location: null,
                  country: null,
                  status: null
              },
              countries: [],
              errors: null,
              jobs: null
          }
        },
        methods: {
            changeJobStatus(id){
                axios.post('/change-job-status', {jobID : id}).then((res) => {
                    if(res.data.status === 'success') {
                        this.getJobs();
                    }
                })
                .catch((e) => {
                    alert('Sorry! Couldn\'t save.')
                })
            },
            createJob(){
                axios.post('/create-job', this.job).then((res) => {
                    if(res.data.status === 'success'){
                        $('#createJob').collapse('hide')
                        $('#postedJobs').collapse('show')
                    }
                })
                .catch((e) => {
                    this.errors = e.response.data.errors
                })
            },
            getJobs(page = 1){
                axios.get('/jobs?page=' + page)
                .then(response => {
                    this.jobs = response.data;
                });
            }
        },
        mounted() {
            console.log('dashboard mounted')
            let authStatus = false
            helper.checkAuth({preventRedirect: true}).then(res => {
                authStatus = res
                console.log("auth " + authStatus)

            });

            console.log("authStatus " + authStatus)

            /*axios.get('/verify')
                .then((res) => {
                    if(res.data.verified !== true){
                        helper.logout(redirectPath)
                    }
                })
                .catch((e) => {
                    helper.logout(redirectPath)
                })*/

            this.countries = countries;
            $('#postedJobs').on('shown.bs.collapse', () => {
                this.getJobs();
            })

            // Decrypt
            /* var bytes = CryptoJS.AES.decrypt(ciphertext, sKey);
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            console.log(decryptedData); */

        },
    }
</script>

<style scoped>

</style>
