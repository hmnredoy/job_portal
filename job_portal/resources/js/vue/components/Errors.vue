<template>
    <div v-if="errors" class="alert alert-danger mt-4 rounded font-bold mb-4 shadow-lg">
        <div v-for="(v, k) in errors" :key="k">
            <p v-for="error in v" :key="error" class="text-sm">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Errors",
    props: ["errors"],
    updated() {
        let error_array = Object.values(this.errors).map((arr) => {return arr.find(x=>x!==undefined)})
        if(error_array.length > 0){
            setTimeout(() => {
                $('.alert').fadeOut();
            }, 3000)

            setTimeout(() => {
                this.errors = null
            }, 3500)


        }
    }
}
</script>

<style scoped>

</style>
