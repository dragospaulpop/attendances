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
      temporary
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
      <v-flex xs12>
        <v-list-tile router to = "/createMeetup" v-if="admin === true">
          <v-list-tile-action>
            <v-icon>card_travel</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Create meetup</v-list-tile-title>
        </v-list-tile>
      </v-flex>
      <v-flex xs12>
      <v-list-tile router to = "/statistics" v-if="admin === true">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Statistics</v-list-tile-title>
      </v-list-tile>
      </v-flex>
      <v-flex xs12>
      <v-list-tile  @click="onSignOut">
        <v-list-tile-action>
          <v-icon>clear</v-icon>
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
      <v-btn flat class="white--text" @click="aboutUs = true"> About us </v-btn>
      <v-dialog v-model="aboutUs" max-width="600">
        <v-card>
          <v-card-title>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel odio auctor, rutrum felis at, volutpat libero. Quisque sollicitudin pretium tortor, ut interdum nisi vestibulum et. Maecenas at diam id purus pharetra feugiat non at enim. Proin eleifend diam vitae arcu pellentesque ullamcorper ut quis lectus. Morbi rhoncus, nisl vel pellentesque commodo, nibh lorem pulvinar diam, vel auctor diam sapien vitae lectus. Integer ornare, enim auctor blandit sodales, diam eros congue leo, nec consequat dui orci sed mauris. Proin tincidunt sagittis libero, vitae sagittis felis blandit id. Donec dictum metus quis lectus tempus aliquam. In mattis mi ac leo ornare varius. Nulla tempor, mauris lobortis viverra gravida, ex diam rutrum enim, id mattis ligula elit sit amet turpis. Curabitur consequat dolor sit amet iaculis laoreet. Aliquam nec aliquam nulla. Vestibulum vehicula magna vel lectus molestie, ut auctor nisl cursus. Aenean ut hendrerit tellus.
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-btn flat class="white--text" @click="terms = true" > Terms and conditions </v-btn>
      <v-dialog v-model="terms" max-width="600">
        <v-card>
          <v-card-title>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel odio auctor, rutrum felis at, volutpat libero. Quisque sollicitudin pretium tortor, ut interdum nisi vestibulum et. Maecenas at diam id purus pharetra feugiat non at enim. Proin eleifend diam vitae arcu pellentesque ullamcorper ut quis lectus. Morbi rhoncus, nisl vel pellentesque commodo, nibh lorem pulvinar diam, vel auctor diam sapien vitae lectus. Integer ornare, enim auctor blandit sodales, diam eros congue leo, nec consequat dui orci sed mauris. Proin tincidunt sagittis libero, vitae sagittis felis blandit id. Donec dictum metus quis lectus tempus aliquam. In mattis mi ac leo ornare varius. Nulla tempor, mauris lobortis viverra gravida, ex diam rutrum enim, id mattis ligula elit sit amet turpis. Curabitur consequat dolor sit amet iaculis laoreet. Aliquam nec aliquam nulla. Vestibulum vehicula magna vel lectus molestie, ut auctor nisl cursus. Aenean ut hendrerit tellus.
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-btn flat class="white--text" @click="contact = true"> Contact </v-btn>
      <v-dialog v-model="contact" max-width="600">
        <v-card>
         <form>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                label="Enter your E-mail"
                v-model="email"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="description"
                id="description"
                v-model="description"
               ></v-text-field>
            </v-flex>
          </v-layout>
           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                type="submit"
                route to='/'>Send message</v-btn>
              <v-btn flat color="primary" router to = "/" @click="contact = false">Back</v-btn>
            </v-flex>
          </v-layout>
        </form>
        </v-card>
      </v-dialog>
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
      aboutUs: false,
      contact: false,
      terms: false,
      email: '',
      description: '',
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false
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