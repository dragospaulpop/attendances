<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Meetup</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="descriere"
                label="Description"
                id="descriere"
                v-model="descriere"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-menu
              ref="menuevent"
              lazy
              :close-on-content-click="false"
              v-model="menuevent"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="dateevent"
            >
              <v-text-field
                slot="activator"
                label="Meeting date"
                v-model="dateevent"
                prepend-icon="event"
                readonly
              >
              </v-text-field>
              <v-date-picker v-model="dateevent" no-title scrollable @change="$refs.menuevent.save(dateevent)">
                <v-spacer>
                </v-spacer>
              </v-date-picker>
            </v-menu>
          </v-flex>
           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                type="submit"
                @click="createMeetup" route to='/'>Create Meetup</v-btn>
              <v-btn flat color="primary" router to = "/">Back</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from '@/firebase'
  export default {
    data () {
      return {
        dateevent: null,
        menuevent: false,
        title: '',
        descriere: ''
      }
    },
    methods: {
      createMeetup () {
        firebase.database().ref('/events/')
          .push({
            titlu: this.title,
            avatar: 'http://lorempixel.com/100/100/',
            descriere: this.descriere,
            data: this.dateevent,
            prezenta: false,
            prezenti: 0,
            comments: ''
          })
      }
    }
  }
</script>