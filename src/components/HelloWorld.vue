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
          {{ value }} %
        </v-progress-circular>
        {{prezente}} din {{total}}
        <v-list two-line>
          <v-menu offset-y>
            <v-btn color="primary" dark slot="activator">
              Month
            </v-btn>
            <v-list>
              <v-list-tile @click="filter.luna = null">  
                <v-list-tile-title>
                 All months
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-list>
              <v-list-tile v-for="(month, index) in months" :key="index" @click="filter.luna = index" class="grey--text">
                <v-list-tile-title> 
                  {{month.nume}} 
                  <template v-if="index === filter.luna">
                   &#10004;
                  </template>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-menu offset-y>
            <v-btn color="primary" dark slot="activator">
              Year
            </v-btn>
            <v-list>
              <v-list-tile @click="filter.an = null">  
                <v-list-tile-title>
                 All years
                </v-list-tile-title>
               </v-list-tile>
            </v-list>
            <v-list>
              <v-list-tile v-for="an in ani" :key="an" @click="filter.an = an">
                <v-list-tile-title> 
                  {{an}}
                  <template v-if="an === filter.an">
                    &#10004;
                  </template>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
           </v-menu>
          <v-list-tile avatar v-for="(event,index) in filterEvents" :key="index">
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
                {{event.data | filtru}}
              </v-list-tile-action-text>
              <v-icon :class="{
                'green--text':event.prezenta,
                'red--text':!event.prezenta
              }" @click="event.prezenta=!event.prezenta">
                {{event.prezenta ? "star" : "star_border"}}
              </v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


<script>
  /* eslint-disable no-unused-vars */
  import moment from 'moment'
  export default {
    name: 'profil',
    data () {
      return {
        prezente: 11,
        total: 30,
        months: [
          {
            nume: 'January',
            clickable: false
          },
          {
            nume: 'February',
            clickable: false
          },
          {
            nume: 'March',
            clickable: false
          },
          {
            nume: 'April',
            clickable: false
          },
          {
            nume: 'May',
            clickable: false
          },
          {
            nume: 'June',
            clickable: false
          },
          {
            nume: 'July',
            clickable: false
          },
          {
            nume: 'August',
            clickable: false
          },
          {
            nume: 'September',
            clickable: false
          },
          {
            nume: 'October',
            clickable: false
          },
          {
            nume: 'November',
            clickable: false
          },
          {
            nume: 'December',
            clickable: false
          }
        ],
        filter: {
          an: null,
          luna: null
        },
        events: [
          {
            titlu: 'Meeting1',
            avatar: 'http://lorempixel.com/100/100/',
            descriere: '<p style="color:red">Intalnire nr 1</p>',
            data: new Date('March 2, 2017'),
            prezenta: true
          },
          {
            titlu: 'Meeting2',
            avatar: 'http://lorempixel.com/100/100/',
            descriere: 'Intalnire nr 2',
            data: new Date('June 2, 2017'),
            prezenta: true
          },
          {
            titlu: 'Meeting3',
            avatar: 'http://lorempixel.com/100/100/',
            descriere: 'Intalnire nr 3',
            data: new Date('December 2, 2017'),
            prezenta: false
          },
          {
            titlu: 'Meeting4',
            avatar: 'http://lorempixel.com/100/100/',
            descriere: 'Intalnire nr 4',
            data: new Date('January 2, 2018'),
            prezenta: true
          },
          {
            titlu: 'Meeting5',
            avatar: 'http://lorempixel.com/100/100/',
            descriere: 'Intalnire nr 5',
            data: new Date('March 2, 2018'),
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
        if (this.value < 50) return 'green'
        if (this.value < 80) return 'blue'
        return 'yellow'
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
      },
      filterEvents () {
        return this.events.filter(event => {
          const an = event.data.getFullYear()
          const month = event.data.getMonth()
          const matchingYears = this.filter.an ? this.filter.an === an : true
          const matchingMonths = this.filter.luna ? this.filter.luna === month : true
          return matchingYears && matchingMonths
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
