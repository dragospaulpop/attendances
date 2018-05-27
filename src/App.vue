<template>
  <v-app>
    <v-navigation-drawer
      v-show="userIsAuthenticated" 
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <div id="text" v-if="admin === false">
        <h1>Welcome</h1>
        <v-flex xs12>
          <v-progress-circular
            :size="110"
            :width="15"
            :rotate="360"
            :value="value"
            :color="color"
          >
            {{ value }} %
          </v-progress-circular>
        </v-flex>
        <v-flex xs12> 
          {{totalParticipari}} events out of {{totalEvents}}
        </v-flex>
      </div>
      <v-flex xs12> 
      <v-list-tile router to = "/">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>
      </v-flex>
      <v-flex xs12> 
      <v-list-tile router to = "/profile">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Account info</v-list-tile-title>
      </v-list-tile>
      </v-flex>
      <v-flex>
      <v-list-tile router to = "/statistics" v-if="admin === true">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Statistics</v-list-tile-title>
      </v-list-tile>
      </v-flex>
      <v-flex xs12> 
      <v-list-tile  @click="onSignOut">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Sign Out</v-list-tile-title>
      </v-list-tile>
      </v-flex>
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          v-if="onLoad"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      dark color="primary"
    >
      <v-toolbar-side-icon v-show="userIsAuthenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Meeting App</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer height="auto" class="primary">
    <v-layout row wrap justify-center>
      <v-btn
        color="white"
        flat
        v-for="link in links"
        :key="link"
      >
        {{ link }}
      </v-btn>
    </v-layout>
  </v-footer>
  </v-app>
</template>

<style>
a, ul, li {
  text-decoration: none;
  list-style-type: none;
}
#text {
  margin: 0;
  padding: 10% 0% 10% 0%;
  text-align: center;
}
</style>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      title: 'v. Narcisa',
      links: ['Home', 'About Us', 'Contact Us']
    }
  },
  name: 'App',
  created: function () {
    this.$store.dispatch('readEvents')
    this.$store.dispatch('AuthChange')
    this.$store.dispatch('getUserData')
  },
  computed: {
    events () {
      return this.$store.getters.events
    },
    admin () {
      return this.$store.getters.admin
    },
    totalEvents () {
      return this.$store.getters.events.length
    },
    totalParticipari () {
      return this.$store.getters.eventsGoing.length
    },
    value () {
      return Math.floor(this.totalParticipari * 100 / this.totalEvents)
    },
    color () {
      if (this.value < 30) return 'red'
      if (this.value < 60) return 'green'
      if (this.value < 80) return 'blue'
      return 'yellow'
    },
    onLoad () {
      if (this.userIsAuthenticated) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    location () {
      return this.$store.getters.location
    }
  },
  mounted: function () {
    this.$store.dispatch('getLocation')
  },
  methods: {
    onSignOut () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
