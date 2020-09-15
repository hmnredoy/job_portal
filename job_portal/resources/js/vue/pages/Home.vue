<template>
    <div>

    <navbar/>

    <main role="main" class="container">
        <div class="starter-template">
            <h1>Bootstrap starter template</h1>
            <p class="lead">Use this document as a way to quickly start any new project.
                <br> All you get is this text and a mostly barebones HTML document.</p>
        </div>
    </main>

    </div>
</template>

<script>
    export default {
        name: "Home",
        mounted() {
            if(localStorage.getItem("token")){
                this.$router.push({ name: 'Dashboard'})
            }
        },
    }
</script>

<style scoped>

</style>
