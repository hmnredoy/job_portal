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
                        <form>
                            <div class="form-group">
                                <label for="j_title">Job Title</label>
                                <input type="text" class="form-control" id="j_title" autofocus>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea class="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="Salary">Salary</label>
                                <input type="text" class="form-control" id="Salary">
                            </div>
                            <div class="form-group">
                                <label for="Location">Location</label>
                                <input type="text" class="form-control" id="Location">
                            </div>
                            <div class="form-group">
                                <label for="country">Country</label>
                                <select class="form-control">
                                    <option>Default select</option>
                                    <option>Default select</option>
                                </select>
                            </div>
                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="status">
                                <label class="form-check-label" for="status">Active</label>
                            </div>
                            <button type="submit" class="btn btn-success">Save</button>
                        </form>
                    </div>
                </div>

                <div class="collapse mb-2" id="postedJobs">
                    <div class="card card-body">

                    </div>
                </div>

                <div class="collapse" id="applications">
                    <div class="card card-body">

                    </div>
                </div>


            </div>
        </div>
    </div>

    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        mounted() {
            // Decrypt
            /* var bytes = CryptoJS.AES.decrypt(ciphertext, sKey);
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            console.log(decryptedData); */

        },
    }
</script>

<style scoped>

</style>
