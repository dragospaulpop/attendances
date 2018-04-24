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
    keysEvents: [],
    keysUsers: [],
    userdetails: []
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
    getKeysUsers: (state, payload) => {
      state.keysUsers = payload
    },
    getLocation: (state, payload) => {
      state.location = payload
    },
    gotUsers: (state, payload) => {
      state.userdetails.push(payload)
    }
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
    deleteEvent ({state}, payload) {
      firebase.database().ref('/events/' + this.state.keysEvents[payload]).remove()
    },
    getUserData ({commit}, payload) {
      return firebase.database().ref('users')
        .on('value', snap => {
          const myObj = snap.val()
          const keysUsers = Object.keys(snap.val())
          keysUsers.forEach(key => {
            const userdetails = {}
            userdetails.nume = myObj[key].nume
            userdetails.prenume = myObj[key].prenume
            commit('gotUsers', userdetails)
          })
          commit('getKeysUsers', keysUsers)
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
            firebase.database().ref('/users/' + newUser.id).set({
              nume: payload.nume,
              prenume: payload.prenume
            })
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
    location: state => state.location,
    userdetails: state => state.userdetails,
    keysUsers: state => state.keysUsers,
    keysEvents: state => state.keysEvents
  }
})
