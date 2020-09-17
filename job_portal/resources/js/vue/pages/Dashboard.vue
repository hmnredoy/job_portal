<template>
    <div>

    <navbar :loginStatus="true"/>

    <div class="container">
        <div class="card">
            <h2 class="pl-2">Welcome {{user.name}}
                <span class="text-muted">({{user.type}})</span>
            </h2>
            <div class="card-body" v-if="user.type === 'company'">
                <button class="btn btn-success mb-2" type="button" data-toggle="collapse" @click="getJobs(1)"
                 data-target="#postedJobs" aria-expanded="true">
                    Posted Jobs
                </button>

                 <button class="btn btn-success mb-2 float-right" type="button" data-toggle="collapse"
                 data-target="#createJob" aria-expanded="false">
                    Create Job +
                </button>

                <div class="collapse mb-2" id="createJob">
                    <div class="card card-body">
                        <form @submit.prevent="createJob" ref="jobForm">
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
                                        <button class="btn btn-xs btn-info" @click="applicants(job.id, job.title)">Applicants</button>
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
                                <br>
                                <h4>{{ selectedJobTitle }}</h4>
                            </div>
                            <div class="card-body table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#ID</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Skills</th>
                                        <th scope="col">Applied At</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="application in applications.data" :key="application.id">
                                        <th scope="row">{{ application.id }}</th>
                                        <td>{{ application.user.firstName }}</td>
                                        <td>{{ application.user.lastName }}</td>
                                        <td>{{ application.user.email }}</td>
                                        <td>{{ application.user.skills }}</td>
                                        <td>{{ application.created_at | dateFormat }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <pagination :data="jobs" @pagination-change-page="getApplications"></pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-4" v-else>
                <div class="card-header">
                    <h4>Applied Jobs</h4>
                </div>
                <div class="card-body table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">title</th>
                            <th scope="col">description</th>
                            <th scope="col">salary</th>
                            <th scope="col">location</th>
                            <th scope="col">country</th>
                            <th scope="col">Applied At</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="job in appliedJobs.data" :key="job.id">
                            <td>{{ job.title }}</td>
                            <td>{{ job.description | str_limit(5) }}</td>
                            <td>{{ job.salary }}</td>
                            <td>{{ job.location }}</td>
                            <td>{{ job.country }}</td>
                            <td>{{ job.pivot.created_at | dateFormat }}</td>
                        </tr>
                        </tbody>
                    </table>

                    <pagination :data="appliedJobs" @pagination-change-page="getAppliedJobs"></pagination>

                </div>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
    import countries from "../../libraries/countries";

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
              jobs: {},
              applications: {},
              selectedJobID: null,
              selectedJobTitle: null,
              user: null,
              appliedJobs: {}
          }
        },
        methods: {
            applicants(jobID, jobTitle){
                $('#applications').collapse('dispose')

                this.selectedJobID = jobID
                this.selectedJobTitle = jobTitle

                this.getApplications(1)
                $('#applications').collapse('show')
            },
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
                        this.getJobs();
                        $('#createJob').collapse('hide')
                        $('#createJob').collapse('dispose')
                        $('#postedJobs').collapse('show')

                        this.$refs.jobForm.reset();
                    }
                })
                .catch((e) => {
                    this.errors = e.response.data.errors
                })
            },
            getJobs(page = 1){
                $('#applications').collapse('hide')
                axios.get('/jobs?page=' + page)
                .then(response => {
                    this.jobs = response.data;
                });
            },
            getApplications(page = 1){
                axios.get('/applications/'+this.selectedJobID+'&page=' + page)
                .then(response => {
                    this.applications = response.data;
                });
            },
            getAppliedJobs(page = 1){
                axios.get('/applied-jobs?page=' + page)
                .then(response => {
                    this.appliedJobs = response.data;
                });
            }
        },
        beforeMount() {
            let userFromStore = this.$store.state.user
            this.user =  userFromStore ? JSON.parse(userFromStore) : this.$user
            this.countries = countries;
            this.user.name = this.user.businessName ?? this.user.firstName
        },
        mounted() {
            $('#postedJobs').collapse('show')
            if(this.user.type === 'applicant'){
                this.getAppliedJobs()
            }
        },
    }
</script>

<style scoped>

</style>
