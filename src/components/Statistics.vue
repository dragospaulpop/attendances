<template>
  <v-container>
    <v-layout justify-space-between>
      <v-flex xs12>
        <v-card class="elevation-12">
          <div id="columnchart_values"></div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-start>
        <v-flex xs12>
          <v-card class="elevation-12">
            <v-card-title>
              <v-icon color="primary"> meeting_room </v-icon>
              Top meetings
            </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-tile v-for="(item, index) in topMeetings" :key="index">
                    <v-list-tile-action>
                      <v-icon v-if="index === 0" color="primary">star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <router-link :to="{ name: 'Events', params: { id: ev.indexOf(topMeetings[index]) }}" tag="li" style="cursor:pointer">
                        <v-list-tile-title v-text="item"></v-list-tile-title>
                      </router-link>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-card-text>
           </v-card>
        </v-flex>
      </v-layout>
      <v-layout justify-space-around>
        <v-flex xs6>
          <v-card class="elevation-12">
            <h3>All meetings</h3>
            <v-card-text>
              <v-list>
                <v-list-tile avatar v-for="(event,index) in events" :key="index">
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
                    <v-list-tile-sub-title v-html="event.descriere">
                    </v-list-tile-sub-title>
                    </router-link>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>
                      {{event.data | filtru}}
                    </v-list-tile-action-text>
                  <v-icon @click="deleteEvent(index)" style="cursor:pointer">
                    delete
                  </v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs6>
          <v-card>
            <h3>All users</h3>
            <v-card-text>
            <v-data-table
            :headers="headers"
            :items="users"
            hide-actions
            class="elevation-12">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.nume }}</td>
              <td class="text-xs-left">{{ props.item.prenume }}</td>
            </template>
          </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<style scoped>
#columnchart_values {
  display: block;
}
</style>

<script>
  /* eslint-disable no-unused-vars */
  import firebase from '@/firebase'
  import moment from 'moment'
  export default {
    data () {
      return {
        eventsAll: [],
        headers: [
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Surname',
            value: 'surname'
          }
        ],
        users: [],
        topMeetings: [],
        ev: [],
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
      this.users = this.$store.getters.userdetails
      this.topEvents()
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
            title: 'Meetings attendances',
            bar: {groupWidth: '95%'},
            legend: { position: 'none' }})
        })
      },
      deleteEvent (index) {
        this.$store.dispatch('deleteEvent', index)
      },
      topEvents () {
        return firebase.database().ref('events')
          .on('value', snap => {
            const topSearch = []
            const numbers = []
            var myObj = snap.val()
            var keysEvents = Object.keys(snap.val())
            this.ev = keysEvents
            keysEvents.forEach(key => {
              numbers.push(myObj[key].prezenti)
            })
            for (var i = 0; i < 3; i++) {
              if (numbers.length === 0) {
                console.log('e gol')
              }
              if (Math.max(...numbers) !== 0) {
                var a = numbers.indexOf(Math.max(...numbers))
                topSearch.push(keysEvents[a])
                numbers[a] = 0
              }
            }
            this.topMeetings = topSearch
          }, function (error) {
            console.log('Error: ' + error.message)
          })
      }
    },
    filters: {
      filtru (date) {
        return moment(date).fromNow()
      }
    }
  }
</script>