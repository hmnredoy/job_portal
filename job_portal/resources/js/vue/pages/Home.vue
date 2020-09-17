<template>
    <div>

        <navbar :loginStatus="user"/>

        <div class="album py-5 bg-light">
            <div class="container">

                <div class="row">
                    <div class="col-md-4" v-for="job in jobs.data" :key="job.id">
                        <div class="card mb-4 shadow-sm">
                            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect>
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em">{{job.title}}</text></svg>
                            <div class="card-body">
                                <p class="card-text">{{job.description}}</p>
                                <p class="text-muted">Company: {{job.owner.businessName}}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">{{job.created_at | fromNow}}</small>
                                    <button type="button" class="btn btn-sm btn-success" @click="apply(job.id)">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <pagination :data="jobs" @pagination-change-page="getJobs"></pagination>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {helper} from "../helper";
    import router from "../router";
    export default {
        name: "Home",
        data() {
            return {
                jobs: {},
                user: null
            }
        },
        methods: {
            getJobs(page = 1){
                axios.get('/all-jobs?page=' + page)
                .then(response => {
                    this.jobs = response.data;
                });
            },
            apply(jobID){
                const token = helper.getFromLocal('token')
                if(token){
                    axios.post('/apply', {token, jobID}).then((res) => {
                        if(res.data.status === 'success'){
                            alert('Applied Successfully!')
                        }
                    }).catch(e => {
                        alert(typeof e.response.data.message !== 'undefined' ? e.response.data.message : 'Something went wrong!')

                        if(e.response.data.type === 'update_cv'){
                            this.$router.push({path: '/profile'})
                        }
                    })
                }else{
                    this.$router.push({path: '/login'})
                }

            },
            getUser(){
                this.token = helper.getFromLocal('token')
                if(this.token){
                    if(!this.$user || typeof this.$user === 'undefined'){
                        axios.get('/user?token='+this.token)
                        .then(response => {
                            this.user = response.data
                        });
                    }else{
                        this.user = this.$user
                    }
                }else{
                    helper.logout('/')
                }
            }
        },
        mounted() {
            this.getJobs();
            this.getUser();
        },
    }
</script>

<style scoped>

</style>
