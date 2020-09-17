<template>
    <div>

        <navbar :loginStatus="user"/>

        <div class="container">
            <pagination :data="jobs" @pagination-change-page="getJobs"></pagination>

            <div id="products" class="row view-group">
                <div class="item col-xs-4 col-lg-4 mb-4" v-for="job in jobs.data" :key="job.id">
                    <div class="thumbnail card">
                        <div class="caption card-body">
                            <h4 class="group card-title inner list-group-item-heading">{{job.title}}</h4>
                            <p class="group inner list-group-item-text">{{job.description}}</p>

                            <div class="card card-footer">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="float-left">
                                        <p class="lead">
                                            BDT {{job.salary}}</p>
                                        <small class="text-muted">{{job.created_at | fromNow}}</small>
                                    </div>
                                    <div class="float-right">
                                        <button class="btn btn-success" @click="apply(job.id)">Apply</button>
                                    </div>
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
