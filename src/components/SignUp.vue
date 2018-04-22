<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Sign up</h1>
        <v-text-field
          label="Nume"
          v-model="nume"
          :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
          label="Prenume"
          v-model="prenume"
          :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
          label="Enter your E-mail"
          v-model="email"
          :rules="[rules.required, rules.email]"
        >
        </v-text-field>
        <v-text-field
          name="input-10-1"
          label="Enter your password"
          hint="At least 8 characters"
          v-model="password"
          min="8"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          :rules="[rules.required]"
          counter
        >
        </v-text-field>
         <v-text-field
          name="input-10-1"
          label="Confirm password"
          hint="At least 8 characters"
          v-model="confirmPassword"
          min="8"
          :type="e1 ? 'password' : 'text'"
          :rules="[comparePasswords]"
        >
        </v-text-field>
        <v-btn color="primary" type="submit" @click="userSignUp">Sign Up</v-btn>  
        <v-btn color="primary" type="submit" to="/login">Back</v-btn>  
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>

</style>


<script>
  export default {
    name: 'login',
    data () {
      return {
        e1: true,
        password: '',
        confirmPassword: '',
        email: '',
        nume: null,
        prenume: null,
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
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      userSignUp () {
        this.$store.dispatch('signUp', {email: this.email, password: this.password, nume: this.nume, prenume: this.prenume})
      }
    }
  }
</script>
