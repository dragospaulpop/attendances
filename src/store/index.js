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
    userdetails: [],
    eventsGoing: [],
    admin: null,
    image: null,
    uploadPicture: [],
    error: null
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
    },
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
    },
    eventsGoing: (state, payload) => {
      state.eventsGoing = payload
    },
    uploadPicture (state, payload) {
      state.uploadPicture.push(payload)
    },
    emptyEvents: (state, payload) => {
      state.events = []
    },
    emptyGoing: (state, payload) => {
      state.eventsGoing = []
    },
    getAdmin: (state, payload) => {
      state.admin = payload
    }
  },
  actions: {
    readEvents ({commit}, payload) {
      return firebase.database().ref('events')
        .on('value', snap => {
          commit('emptyEvents')
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
            eventdetails.prezenti = myObj[key].prezenti
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
    deleteComment ({state}, payload) {
      var comments = []
      firebase.database().ref('/events/' + this.state.keysEvents[payload.idevent] + '/comments/')
        .on('value', snap => {
          try {
            comments = Object.keys(snap.val())
          } catch (e) {
            //
          }
        }, function (error) {
          console.log('Error: ' + error.message)
        })
      firebase.database().ref('/events/' + this.state.keysEvents[payload.idevent] + '/comments/' + comments[payload.index]).remove()
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
            userdetails.image = myObj[key].image
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
              prenume: payload.prenume,
              admin: false,
              image: '',
              participari: ''
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
            firebase.database().ref('users/' + newUser.id)
              .on('value', snap => {
                const myObj = snap.val()
                var admin = myObj.admin
                commit('getAdmin', admin)
              }, function (error) {
                console.log('Error: ' + error.message)
              })
          }
        )
        .catch(
          error => {
            commit('setError', error)
          }
        )
    },
    AuthChange ({commit}) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.database().ref('users/' + user.uid)
            .on('value', snap => {
              const myObj = snap.val()
              commit('getAdmin', myObj.admin)
            }, error => {
              console.log('Error: ' + error.message)
            })
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
    },
    changeDetails (payload) {
      const cale = firebase.database().ref('users/' + this.state.user.uid)
      console.log(cale)
      console.log(payload.nume, payload.prenume)
      cale.update({nume: payload.nume, prenume: payload.prenume})
    },
    getEventsGoing ({commit}) {
      return firebase.database().ref('/users/' + this.state.user.uid + '/participari')
        .on('value', snap => {
          commit('emptyGoing')
          const participari = Object.keys(snap.val())
          commit('eventsGoing', participari)
        })
    },
    Going ({commit}, payload) {
      const user = this.state.user.uid
      return firebase.database().ref('/users/' + user + '/participari/' + this.state.keysEvents[payload])
        .set({
          text: true
        })
    },
    setPrezenti ({state}, payload) {
      return firebase.database().ref('/events/' + this.state.keysEvents[payload])
        .update({
          prezenti: +this.state.events[payload].prezenti + 1
        })
    }
  },
  getters: {
    events: state => state.events,
    user: state => state.user,
    location: state => state.location,
    userdetails: state => state.userdetails,
    keysUsers: state => state.keysUsers,
    keysEvents: state => state.keysEvents,
    eventsGoing: state => state.eventsGoing,
    admin: state => state.admin,
    uploadPicture: state => state.uploadPicture,
    error: state => state.error
  }
})
