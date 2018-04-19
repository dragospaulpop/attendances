import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [],
    location: {
      lat: null,
      long: null,
      accu: null
    },
    fb: {
      db: firebase.database()
    },
    user: null,
    keysEvents: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    getEvents: (state, payload) => {
      state.events.push(payload)
    },
    getKeys: (state, payload) => {
      state.keysEvents = payload
    },
    getLocation: (state, payload) => {
      state.location = payload
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  },
  actions: {
    readEvents ({commit}, payload) {
      return firebase.database().ref('events')
        .on('value', snap => {
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
            commit('getEvents', eventdetails)
          })
          commit('getKeys', keys)
        }, function (error) {
          console.log('Error: ' + error.message)
        })
    },
    signUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            router.push({path: '/'})
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            // router.push({path: '/'})
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    AuthChange ({commit}) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('setUser', user)
        } else {
          commit('setUser', null)
        }
      })
    },
    signOut ({commit}) {
      firebase.auth().signOut().then(function () {
        commit('setUser', null)
      }).catch(
        error => {
          console.log(error)
        })
    },
    getLocation ({commit}, payload) {
      return navigator.geolocation.getCurrentPosition(pos => {
        commit('getLocation', {
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
          acc: pos.coords.accuracy
        })
      },
      error => {
        window.alert(error.message)
      }, { enableHighAccuracy: true,
        maximumAge: 0 })
    }
  },
  getters: {
    events: state => state.events,
    user: state => state.user,
    location: state => state.location
  }
})
