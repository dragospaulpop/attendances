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
      <h1>My profile</h1>
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
      <v-chip close v-model="chip1" @click="onSignOut">Sign out</v-chip>
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

<script>
export default {
  data () {
    return {
      chip1: true,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'v. Narcisa',
      prezente: 11,
      total: 30,
      links: ['Home', 'About Us', 'Contact Us']
    }
  },
  name: 'App',
  created: function () {
    this.$store.dispatch('readEvents')
    this.$store.dispatch('AuthChange')
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
