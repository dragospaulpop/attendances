<template>
  <v-container fluid>
      <v-card>
        <v-card-media src="https://picsum.photos/200/250/?random" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <p> {{ this.events[id].titlu }} </p>
        </v-card-title>
        <v-card-title secondary-title>
          <p> {{ this.events[id].descriere }} </p>
        </v-card-title>
        <v-card-text>
        <v-btn color="primary" @click="participanti = true">Who's going</v-btn>
        <v-flex xs12>
          <v-card>
            <div id="piechart_3d"></div>
          </v-card>
        </v-flex>
        </v-card-text>
        <v-list-tile v-for="(comment,index) in comments" :key="index">
          <v-list-tile-title>
            {{comment}}
          </v-list-tile-title>
          <v-list-tile-action v-if="admin === true">
            <v-icon @click="deleteComment(index)" style="cursor:pointer">
              delete
            </v-icon>
          </v-list-tile-action>
         </v-list-tile>
        <v-btn color="primary" @click="comment()">Add a comment</v-btn>
        <v-flex xs8 id="input">
          <v-text-field label="Add a comment" textarea id="textInput">
          </v-text-field>
        </v-flex>
        <v-card-actions>
          <v-btn flat color="primary" @click="cancelComment()"  v-if="commentAdd === true">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" v-if="commentAdd === true" @click="postComment()">Post</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn flat color="primary" router to = "/">Back</v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog v-model="participanti" max-width="480">
        <v-card>
          <v-list-tile v-for="(comment,index) in comments" :key="index">
            <v-list-tile-title>
              {{comment}}
            </v-list-tile-title>
          </v-list-tile>
        </v-card>
      </v-dialog>

  </v-container>
</template>

<style scoped>
#input {
  display:none;
}
a, ul, li {
  text-decoration: none;
  list-style-type: none;
}
</style>

<script>
  import firebase from '@/firebase'
  export default {
    name: 'events',
    data () {
      return {
        id: this.$route.params.id,
        commentAdd: false,
        comments: [],
        participanti: false,
        usersGoing: []
      }
    },
    created () {
      return firebase.database().ref('/events/' + this.keysEvents[this.id])
        .on('value', snap => {
          try {
            this.comments = []
            const myObj = snap.val()
            const keys = Object.keys(snap.val().comments)
            keys.forEach(key => {
              this.comments.push(myObj.comments[key].comment)
            })
          } catch (e) {
            //
          }
        }, function (error) {
          console.log('Error: ' + error.message)
        })
    },
    computed: {
      events () {
        return this.$store.getters.events
      },
      keysEvents () {
        return this.$store.getters.keysEvents
      },
      userdetails () {
        return this.$store.getters.userdetails
      },
      admin () {
        return this.$store.getters.admin
      },
      eventComments () {
        return firebase.database().ref('/events/' + this.keysEvents[this.id])
          .on('value', snap => {
            try {
              this.comments = []
              const myObj = snap.val()
              const keys = Object.keys(snap.val().comments)
              keys.forEach(key => {
                this.comments.push(myObj.comments[key].comment)
              })
            } catch (e) {
              //
            }
          }, function (error) {
            console.log('Error: ' + error.message)
          })
      }
    },
    mounted () {
      this.chart1()
      this.users()
    },
    methods: {
      comment () {
        document.getElementById('input').style.display = 'inline'
        this.commentAdd = true
      },
      cancelComment () {
        document.getElementById('input').style.display = 'none'
        this.commentAdd = false
      },
      postComment () {
        this.commentAdd = false
        firebase.database().ref('/events/' + this.keysEvents[this.id] + '/comments/')
          .push({
            comment: document.getElementById('textInput').value
          })
        document.getElementById('input').style.display = 'none'
      },
      chart1 () {
        window.google.charts.load('current', {packages: ['corechart']})
        window.google.charts.setOnLoadCallback(() => {
          var data = window.google.visualization.arrayToDataTable([
            ['Meeting', 'Percent'],
            ['Going', this.events[this.id].prezenti],
            ['Not going', this.userdetails.length - this.events[this.id].prezenti]
          ])
          var options = {
            is3D: true
          }
          var chart = new window.google.visualization.PieChart(document.getElementById('piechart_3d'))
          chart.draw(data, options)
        })
      },
      deleteComment (index) {
        this.$store.dispatch('deleteComment', {index: index, idevent: this.id})
      },
      users () {
        return firebase.database().ref('users')
          .on('value', snap => {
            const myObj = snap.val()
            const keys = Object.keys(snap.val())
            keys.forEach(key => {
              if (Object.keys(myObj[key].participari).indexOf(this.keysEvents[this.id]) === 0) {
                this.usersGoing.push('ceva')
              }
            })
          }, function (error) {
            console.log('Error: ' + error.message)
          })
      }
    }
  }
</script>
