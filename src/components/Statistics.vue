<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-left>
        <div id="piechart_3d" style="width: 900px; height: 300px;"></div>
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
      this.chart1()
      this.chart2()
    },
    methods: {
      chart1 () {
        window.google.charts.load('current', {packages: ['corechart']})
        window.google.charts.setOnLoadCallback(drawChart)
        function drawChart () {
          var data = window.google.visualization.arrayToDataTable([
            ['Meeting', 'Percent'],
            ['Work', 11],
            ['Eat', 2],
            ['Commute', 2],
            ['Watch TV', 2],
            ['Sleep', 7]
          ])
          var options = {
            title: 'Attendance % for each meeting',
            is3D: true
          }
          var chart = new window.google.visualization.PieChart(document.getElementById('piechart_3d'))
          chart.draw(data, options)
        }
      },
      chart2 () {
        window.google.charts.load('current', {packages: ['corechart']})
        window.google.charts.setOnLoadCallback(drawChart)
        function drawChart () {
          var data = window.google.visualization.arrayToDataTable([
            [ 'Meeting', 'Attending', { role: 'style' } ],
            ['Meeting4', 2, 'purple'],
            ['Meeting1', 1, 'pink'],
            ['Meeting2', 1, 'yellow'],
            ['Meeting3', 0.5, 'grey']
          ])
          var view = new window.google.visualization.DataView(data)
          view.setColumns([0, 1,
            { calc: 'stringify',
              sourceColumn: 1,
              type: 'string',
              role: 'annotation' },
            2])
          var options = {
            title: 'Meetings with most attendances',
            width: 600,
            height: 400,
            bar: {groupWidth: '95%'},
            legend: { position: 'none' }
          }
          var chart = new window.google.visualization.ColumnChart(document.getElementById('columnchart_values'))
          chart.draw(view, options)
        }
      }
    }
  }
</script>
