<template>
    <div>
        <navbar/>
        <br><br><br>
        <form class="form-signin" @submit.prevent="register">
            <div class="text-center mb-4">
                <!-- <img class="mb-4" src="/docs/4.5/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"> -->
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
            </div>
            <div class="form-group">
                <label for="inputState">Register As</label>
                <select class="form-control" @change="setType($event)">
                    <option selected disabled>Choose...</option>
                    <option value="company">Company</option>
                    <option value="applicant">Applicant</option>
                </select>
            </div>
            <div class="form-group" v-if="user.type">
                <input type="text" v-model="user.firstName" class="form-control" placeholder="First Name" required autofocus>
            </div>
            <div class="form-group" v-if="user.type">
                <input type="text" v-model="user.lastName" class="form-control" placeholder="Last Name" required>
            </div>
            <div class="form-group" v-if="user.type === 'company'">
                <input type="text" v-model="user.businessName" class="form-control" placeholder="Business Name" required>
            </div>
            <div class="form-group" v-if="user.type">
                <input type="text" v-model="user.email" class="form-control" placeholder="Email" required>
            </div>
            <div class="form-group" v-if="user.type">
                <input type="password" v-model="user.password" class="form-control" placeholder="Password" required>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit" v-if="user.type">Register</button>

            <div v-if="errors" class="alert alert-danger mt-4 rounded font-bold mb-4 shadow-lg">
                <div v-for="(v, k) in errors" :key="k">
                    <p v-for="error in v" :key="error" class="text-sm">
                    {{ error }}
                    </p>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    export default {
        name: "Register",
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
                errors: null
            }
        },
        methods: {
            setType(event){
                this.user.type = event.target.value
            },
            register(){
                axios.post('/register', this.user)
                .then((res) => {
                    this.errors = null
                    localStorage.setItem("token", res.data.token)
                    this.$store.commit("setLogin", true)
                    this.$router.push({ name: 'Dashboard'})
                })
                .catch((e) => {
                    this.errors = e.response.data.errors
                })
            }
        }
    }
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input,
.form-label-group label {
  height: 3.125rem;
  padding: .75rem;
}

.form-label-group label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  pointer-events: none;
  cursor: text; /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:-moz-placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:-ms-input-placeholder) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:-moz-placeholder-shown) ~ label {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 12px;
  color: #777;
}

.form-label-group input:not(:-ms-input-placeholder) ~ label {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 12px;
  color: #777;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 12px;
  color: #777;
}

/* Fallback for Edge
-------------------------------------------------- */
@supports (-ms-ime-align: auto) {
  .form-label-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }

  .form-label-group label {
    position: static;
  }

  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}
</style>
