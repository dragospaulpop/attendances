<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media src="https://picsum.photos/200/250/?random" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          Events
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" router to = "/">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style scoped>

</style>


<script>
  export default {
    name: 'events',
    data () {
      return {
        id: this.$route.params.id
      }
    }
  }
</script>
