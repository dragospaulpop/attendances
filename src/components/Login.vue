<template>
  <v-layout>
    <v-flex xs1 offset-sm3>
      <div>
        <h1>Sign in</h1>
        <input type="text" placeholder="Email">
        <input type="password" placeholder="Password">  
        <v-btn color="primary" router to = "/">Login</v-btn>  
      </div>
    </v-flex>
  </v-layout>
</template>

<style scoped>

</style>


<script>
  export default {
    name: 'login'
  }
</script>
