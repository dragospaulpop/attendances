<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-carousel style="height:300px">
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            transition="fade"
            reverse-transition="fade"
          >
          </v-carousel-item>
        </v-carousel>
        <v-card-title primary-title>
          <p> {{ this.events[id].titlu }} </p>
        </v-card-title>
        <v-card-title secondary-title>
          <p> {{ this.events[id].descriere }} </p>
        </v-card-title>
        <v-flex xs4>
            <v-card>
              <div id="piechart_3d"></div>
            </v-card>
          </v-flex>
          <v-btn color="primary" @click="participanti = true">Who's going</v-btn>
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
          <v-list-tile v-for="(user, index) in usersGoing" :key="index">
            <v-list-tile-title>
              {{user}}
            </v-list-tile-title>
          </v-list-tile>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<style scoped>
#input {
  display:none;
}
a, ul, li {
  text-decoration: none;
  list-style-type: none;
}
p {
  font-weight: bold;
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
        usersGoing: [],
        items: [
          {
            src: 'https://www.ejobs.ro/img/userCoverPhoto/2/6/263a613dc976a2fbc7e38fa48417ec61.png'
          },
          {
            src: 'http://officefitout.ro/en/wp-content/uploads/sites/2/2015/02/ALX_0129.jpg'
          },
          {
            src: 'https://media.glassdoor.com/l/bd/a7/7d/40/two-day-hackaton-at-qualitance.jpg'
          },
          {
            src: 'https://www.startus.cc/sites/default/files/styles/company_profile_gallery_image/public/company-profile-gallery/selection_009_0.png?itok=0EXA_ld5'
          }
        ]
      }
    },
    computed: {
      events () {
        return this.$store.getters.events
      },
      admin () {
        return this.$store.getters.admin
      },
      userdetails () {
        return this.$store.getters.userdetails
      },
      keysEvents () {
        return this.$store.getters.keysEvents
      },
      keysUsers () {
        return this.$store.getters.keysUsers
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
    methods: {
      comment () {
        document.getElementById('input').style.display = 'inline'
        this.commentAdd = true
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
      cancelComment () {
        document.getElementById('input').style.display = 'none'
        this.commentAdd = false
      },
      deleteComment (index) {
        this.$store.dispatch('deleteComment', {index: index, idevent: this.id})
      },
      postComment () {
        this.commentAdd = false
        firebase.database().ref('/events/' + this.keysEvents[this.id] + '/comments/')
          .push({
            comment: document.getElementById('textInput').value
          })
        document.getElementById('input').style.display = 'none'
      },
      users () {
        return firebase.database().ref('users')
          .on('value', snap => {
            const keyEvent = this.keysEvents[this.id]
            const myObj = snap.val()
            const keys = Object.keys(snap.val())
            keys.forEach(key => {
              let participari = Object.keys(myObj[key].participari)
              if (participari.includes(keyEvent)) {
                this.usersGoing.push(myObj[key].nume + ' ' + myObj[key].prenume)
              }
            })
          }, function (error) {
            console.log('Error: ' + error.message)
          })
      }
    }
  }
</script>