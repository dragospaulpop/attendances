<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media src="https://picsum.photos/200/250/?random" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <p> {{ this.events[id].titlu }} </p>
        </v-card-title>
        <v-card-title secondary-title>
          <p> {{ this.events[id].descriere }} </p>
        </v-card-title>
        <v-btn color="primary" @click="comment()">Add a comment</v-btn>
        <v-flex xs8 id="input">
          <v-text-field label="Add a comment" textarea>
          </v-text-field>
        </v-flex>
         <v-card-actions>
        <v-btn flat color="primary" router to = "/">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style scoped>
#input {
  display:none;
}
</style>

<script>
  export default {
    name: 'events',
    data () {
      return {
        id: this.$route.params.id
      }
    },
    computed: {
      events () {
        return this.$store.getters.events
      }
    },
    methods: {
      comment () {
        document.getElementById('input').style.display = 'inline'
      }
    }
  }
</script>
