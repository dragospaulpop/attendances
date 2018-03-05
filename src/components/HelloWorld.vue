<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
     

    <v-progress-circular
      :size="100"
      :width="15"
      :rotate="360"
      :value="value"
      :color="color"
    >
      {{ value }}
    </v-progress-circular>
    {{prezente}} din {{total}}

      <v-list two-line>
        <v-menu offset-y>
         <v-btn slot="activator"> AN
          </v-btn>
          <v-list>
            <v-list-tile :value="ani" v-for="(event,index) in events" :key="index" @click="">
             <v-list-tile-title>
              {{year}}
             </v-list-tile-title>
            </v-list-tile>
          </v-list>
         </v-menu>
          <v-menu offset-y>
         <v-btn slot="activator"> LUNA
          </v-btn>
          <v-list>
            <v-list-tile v-for="month in months" :key="month.nume" @click="">
             <v-list-tile-title>
                {{month.nume}}
             </v-list-tile-title>
            </v-list-tile>
          </v-list>
         </v-menu>
        <v-list-tile avatar v-for="(event,index) in events" :key="index">
        <v-list-tile-avatar>
        <img :src="event.avatar">
        </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
            {{event.titlu}}
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="event.descriere">
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
            {{event.data | longtimeago}}
            </v-list-tile-action-text>
            <v-icon :class="{'green--text':event.prezenta, 'red--text':!event.prezenta}" @click="event.prezenta=!event.prezenta">
            {{event.prezenta ? 'star' : 'star_border'}}
            </v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
  /* eslint-disable no-unused-vars */
  import moment from 'moment'
  export default {
    name: 'profil',
    data () {
      return {
        prezente: 45,
        total: 50,
        years: [],
        months: [
          { nume: 'January' },
          { nume: 'February' },
          { nume: 'March' },
          { nume: 'April' },
          { nume: 'May' },
          { nume: 'June' },
          { nume: 'July' },
          { nume: 'August' },
          { nume: 'September' },
          { nume: 'October' },
          { nume: 'November' },
          { nume: 'December' }
        ],
        events: [
          {
            titlu: 'titlu1',
            avatar: 'http://lorempixel.com/100/100/',
            descriere: 'asdhihdckeckj',
            data: new Date(),
            prezenta: true
          },
          {
            titlu: 'titlu2',
            avatar: 'http://lorempixel.com/100/100/',
            descriere: '<b>asdhihdckeckj bsdfjbhsdhfskkkf</b>',
            data: new Date((new Date()).setDate(25)),
            prezenta: false
          }
        ]
      }
    },
    computed: {
      value () {
        return Math.floor(this.prezente * 100 / this.total)
      },
      color () {
        if (this.value < 25) return 'red'
        if (this.value < 50) return 'orange'
        if (this.value < 75) return 'green'
        return 'blue'
      },
      ani () {
        let ani = []
        this.events.forEach((event, index) => {
          let an = event.data.getFullYear()
          if (!ani.includes(an)) {
            ani.push(an)
          }
        })
        return ani
      }
    },
    filters: {
      longtimeago (date) {
        return moment(date).fromNow()
      }
    }
  }
</script>