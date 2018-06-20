<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
         <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Sign in</v-toolbar-title>
            </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                label="Enter your E-mail"
                v-model="email"
                :rules="[rules.required, rules.email]"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="input-10-1"
                label="Enter your password"
                hint="At least 8 characters"
                v-model="password"
                min="8"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                :rules="[rules.required]"
                counter
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" @click="userSignin">Login</v-btn>
            <v-btn color="primary" type="submit" @click="forgotPassword">Forgot password</v-btn>
            <v-btn color="primary" type="submit" to="/signup">Sign Up</v-btn>
          </v-card-actions>
          </v-card>
            <v-alert :value="true" type="error" v-if="error !== null">
              Incorrect email or password. Please try again.
            </v-alert>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<style scoped>
</style>


<script>
  import firebase from '@/firebase'
  export default {
    name: 'login',
    data () {
      return {
        e1: true,
        password: '',
        email: '',
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
      userSignin () {
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
      },
      forgotPassword () {
        const emailprompt = prompt('Introdu adresa de email', '')
        firebase.auth().sendPasswordResetEmail(emailprompt).then(function () {
          window.alert('A fost trimis un email de recuperare a parolei la adresa: ' + emailprompt)
        }).catch(function (error) {
          window.alert(error.message)
        })
      }
    }
  }
</script>