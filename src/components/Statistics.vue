<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-left>
        <div id="columnchart_values" style="width: 900px; height: 300px;"></div>
        <v-card>
          <v-card-title>
           All users
          </v-card-title>
            <v-list-tile v-for="(userdetails,index) in userdetails" :key="index">
              <v-list-tile-title>
                {{userdetails.nume}}
                {{userdetails.prenume}}
              </v-list-tile-title>
            </v-list-tile>
        </v-card>
        <v-card>
          <v-card-title>
            All meetings
          </v-card-title>
        <v-list two-line>
          <v-list-tile avatar v-for="(event,index) in filterEvents" :key="index">
            <router-link :to="{ name: 'Events', params: { id: index }}" tag="li" style="cursor:pointer">
            <v-list-tile-avatar>
              <img :src="event.avatar">
            </v-list-tile-avatar>
            </router-link>
            <v-list-tile-content>
              <router-link :to="{ name: 'Events', params: { id: index }}" tag="li" style="cursor:pointer">
              <v-list-tile-title>
                {{event.titlu}}
              </v-list-tile-title>
              </router-link>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<style scoped>

</style>

<script>
  /* eslint-disable no-unused-vars */
  import firebase from '@/firebase'
  import moment from 'moment'
  export default {
    data () {
      return {
        eventsAll: [],
        filter: {
          an: null,
          luna: null
        }
      }
    },
    computed: {
      events () {
        return this.$store.getters.events
      },
      keysevents () {
        return this.$store.getters.keysEvents
      },
      totalParticipari () {
        return this.$store.getters.eventsGoing.length
      },
      userdetails () {
        return this.$store.getters.userdetails
      },
      filterEvents () {
        return this.events.filter(event => {
          const an = event.data.getFullYear()
          const month = event.data.getMonth()
          let matchingYears = true
          let matchingMonths = true
          let beforeData = true
          let afterData = true
          let betweenData = true
          if (this.filter.an || this.filter.luna) {
            matchingYears = this.filter.an ? this.filter.an === an : true
            matchingMonths = this.filter.luna ? this.filter.luna === month : true
          } else if (this.date || this.date1) {
            const data = moment(event.data)
            const after = moment(this.date)
            const before = moment(this.date1)
            if (after === null && before) {
              beforeData = before ? data.isSameOrBefore(before) : true
            } else if (after && before === null) {
              afterData = after ? data.isSameOrAfter(after) : true
            } else if (after && before) {
              betweenData = (before && after) ? data.isBetween(after, before, null, '[]') : true
            }
          }
          return matchingYears && matchingMonths && beforeData && afterData && betweenData
        })
      }
    },
    mounted () {
      this.chart2()
      this.readEvents()
    },
    methods: {
      readEvents () {
        return firebase.database().ref('events')
          .on('value', snap => {
            var all = []
            const myObj = snap.val()
            const keys = Object.keys(snap.val())
            keys.forEach(key => {
              var eventdetails = {}
              eventdetails.avatar = myObj[key].avatar
              eventdetails.descriere = myObj[key].descriere
              eventdetails.id = myObj[key].id
              eventdetails.prezenta = myObj[key].prezenta
              eventdetails.titlu = myObj[key].titlu
              eventdetails.data = new Date(myObj[key].data)
              eventdetails.prezenti = myObj[key].prezenti
              all.push(eventdetails)
            })
            this.eventsAll = all
          }, function (error) {
            console.log('Error: ' + error.message)
          })
      },
      chart2 () {
        var x = [[ 'Meeting', 'Attending', { role: 'style' } ]]
        for (var i = 0; i < this.events.length; i++) {
          x.push([this.events[i].titlu, this.events[i].prezenti, 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'])
        }
        console.log(x)
        window.google.charts.load('current', {packages: ['corechart']})
        window.google.charts.setOnLoadCallback(() => {
          var view = new window.google.visualization.DataView(
            window.google.visualization.arrayToDataTable(x))
          view.setColumns([0, 1,
            { calc: 'stringify',
              sourceColumn: 1,
              type: 'string',
              role: 'annotation' },
            2])
          var chart = new window.google.visualization.ColumnChart(document.getElementById('columnchart_values'))
          chart.draw(view, {
            title: 'Meetings with most attendances',
            width: 600,
            height: 400,
            bar: {groupWidth: '95%'},
            legend: { position: 'none' }})
        })
      }
    }
  }
</script>
