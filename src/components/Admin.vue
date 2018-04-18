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
              <v-list-tile v-for="(month, index) in months" :key="index" @click="filter.luna = index" 
               :class="{'black--text':month.clickable, 'grey--text':!month.clickable}">
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
          <v-btn color="primary" @click = "filter.luna = null, filter.an = null, date = null, date1 = null">
              Reset
          </v-btn>
          <v-btn color="primary" to="/createMeetup">
            Add meeting
          </v-btn>
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
              <v-date-picker v-model="date" no-title scrollable @change="$refs.menu.save(date)">
                <v-spacer>
                </v-spacer>
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
              <v-list-tile-action-text>
                {{event.data | filtru}}
              </v-list-tile-action-text>
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
        switch1: true,
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
        }
      }
    },
    computed: {
      events () {
        return this.$store.getters.events
      },
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
    filters: {
      filtru (date) {
        return moment(date).fromNow()
      }
    }
  }
</script>
