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
                 <template v-if="filter.luna === null">
                  &#10004;
                 </template>
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
                 <template v-if="filter.an === null">
                  &#10004;
                 </template>
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
          <v-flex xs11 sm5> 
            <v-menu
              ref="menu"
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="date"
            >
              <v-text-field
                slot="activator"
                label="Data de start"
                v-model="date"
                prepend-icon="event"
                readonly
              >
              </v-text-field>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer>
                </v-spacer>
                <v-btn flat color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs11 sm5>
            <v-menu
              ref="menu1"
              lazy
              :close-on-content-click="false"
              v-model="menu1"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="date1"
            >
              <v-text-field
                slot="activator"
                label="Data de final"
                v-model="date1"
                prepend-icon="event"
                readonly
              >
              </v-text-field>
              <v-date-picker v-model="date1" no-title scrollable>
                <v-spacer>
                </v-spacer>
                <v-btn flat color="primary" @click="menu1 = false">
                  Cancel
                </v-btn>
                <v-btn flat color="primary" @click="$refs.menu1.save(date1)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
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
        date: null,
        menu: false,
        date1: null,
        menu1: false,
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
      dateFilter () {
        return this.events.filter(event => {
          const dataSelectata1 = this.$refs.menu.save.date()
          const dataSelectata2 = this.$refs.menu1.save.date1()
          if (this.event.data > dataSelectata1 && this.event.data < dataSelectata2) {
            return this.event
          }
        })
      },
      clickableMonths () {
        this.months.forEach(month => {
          if (this.months === this.events.data) {
            return this.months.clickable === true
          }
        })
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
