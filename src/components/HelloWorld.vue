<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-list two-line>
          <v-menu offset-y>
            <v-btn flat color="primary" dark slot="activator">
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
              <v-list-tile v-for="(month, index) in months" :key="index" @click="filter.luna = index">
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
            <v-btn flat  color="primary" dark slot="activator">
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
          <v-btn flat color="primary" @click = "filter.luna = null, filter.an = null, date = null, date1 = null">
              Reset
          </v-btn>
          <v-flex xs12> 
            <v-menu
              ref="menu"
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="scale-transition"
              offset-y
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="date"
            >
              <v-text-field
                slot="activator"
                label="Start date"
                v-model="date"
                prepend-icon="event"
                readonly
              >
              </v-text-field>
              <v-date-picker v-model="date" no-title scrollable @change="$refs.menu.save(date)">
                <v-spacer>
                </v-spacer>
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="menu1"
              lazy
              :close-on-content-click="false"
              v-model="menu1"
              transition="scale-transition"
              offset-y
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="date1"
            >
              <v-text-field
                slot="activator"
                label="End date"
                v-model="date1"
                prepend-icon="event"
                readonly
              >
              </v-text-field>
              <v-date-picker v-model="date1" no-title scrollable @change="$refs.menu1.save(date1)">
                <v-spacer>
                </v-spacer>
              </v-date-picker>
            </v-menu>
          </v-flex>
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
              <v-list-tile-sub-title v-html="event.descriere">
              </v-list-tile-sub-title>
              </router-link>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn color="primary" @click="addGoing(index)" v-if="areyougoing.indexOf(index) === -1">
                Attend
              </v-btn>
              <v-btn disabled v-else>
                Going
              </v-btn>
              <v-list-tile-action-text>
                {{event.data | filtru}}
              </v-list-tile-action-text>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <div id="map"></div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #map {
   width: 45%;
   height: 400px;
   background-color: grey;
   display: none;
 }
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
        ceva: false,
        id: null,
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
        }
      }
    },
    computed: {
      events () {
        return this.$store.getters.events
      },
      keysEvents () {
        return this.$store.getters.keysEvents
      },
      eventsGoing () {
        return this.$store.getters.eventsGoing
      },
      coords () {
        return this.$store.getters.location
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
      },
      areyougoing () {
        var keys = []
        for (var i = 0; i < this.eventsGoing.length; i++) {
          keys.push(this.keysEvents.indexOf(this.eventsGoing[i]))
        }
        return keys
      }
    },
    filters: {
      filtru (date) {
        return moment(date).fromNow()
      }
    },
    created: function () {
      this.$store.dispatch('getEventsGoing')
    },
    methods: {
      getLocation () {
        this.$store.dispatch('getLocation')
      },
      addGoing (index) {
        const distanta = (Math.sqrt(Math.pow((+this.coords.lat - 44.4336509), 2) + Math.pow((+this.coords.long - 26.0772394), 2)) * 100 * 1000)
        if (+distanta > 100) {
          this.$store.dispatch('Going', index)
          this.$store.dispatch('setPrezenti', index)
        }
      }
    },
    mounted: function () {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: +this.coords.lat, lng: +this.coords.long},
        zoom: 16
      })
      var marker = new window.google.maps.Marker({
        position: {lat: +this.coords.lat, lng: +this.coords.long},
        map: map
      })
    }
  }
</script>