<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
         <router-link to="/" class="navbar-brand">Job Portal</router-link>

        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">

        <ul class="navbar-nav ml-auto" v-if="loggedIn">
            <li class="nav-item">
                  <router-link to="dashboard" class="nav-link">
                      Dashboard
                  </router-link>
            </li>
            <li class="nav-item">
                  <router-link to="profile" class="nav-link">
                      Profile
                  </router-link>
            </li>
            <li class="nav-item">
                  <a href="javascript:;" class="nav-link" @click.prevent="logout">Logout</a>
            </li>
        </ul>
         <ul class="navbar-nav ml-auto" v-else>
            <li class="nav-item">
                  <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link to="register" class="nav-link">Register</router-link>
            </li>
        </ul>
    </div>
    </nav>
</template>

<script>
    import {helper} from "../helper";

    export default {
        name: "Navbar",
        computed: {
            loggedIn(){
                return this.$store.state.loggedIn || localStorage.getItem("token")
            }
        },
        methods: {
            logout(){
                helper.logout()
            }
        }
    }
</script>

<style scoped>

</style>
