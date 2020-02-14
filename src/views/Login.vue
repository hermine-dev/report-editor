<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-toolbar class="blue darken-4">
          <v-toolbar-title class="white--text">Login</v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-alert type="error" v-if="errorMessage">
                {{errorMessage}}
              </v-alert>
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="Enter your e-mail address"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Enter your password"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  counter
                  required
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn @click="submit" :class="{'blue darken-4 white--text': valid, disabled: !valid }" color="primary">Login</v-btn>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { setAuthHeader } from '../axiosApi'

export default {
  name: 'Login',

  data: () => ({
    valid: false,
    e1: true,
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required'
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      // eslint-disable-next-line no-useless-escape
      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    errorMessage: null
  }),
  methods: {
    submit () {
      this.errorMessage = null
      if (this.$refs.form.validate()) {
        // this.$refs.form.$el.submit()
        const data = {}
        data.username = this.email
        data.password = this.password

        return this.$store.dispatch('auth/signIn', data).then((res) => {
          if (res.token) {
            setAuthHeader(localStorage.getItem('token'))
            this.$router.push('/')
          } else if (res.message) { // something went wrong
            //
            this.errorMessage = res.message
          }
          // here we have changed this.signUpData from auth state
        }).catch((err) => {
          return err.response
        })
      }
    }
  }
}
</script>
