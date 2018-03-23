import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [
      {
        id: 0,
        titlu: 'Meeting1',
        avatar: 'http://lorempixel.com/100/100/',
        descriere: '<p style="color:red">Intalnire nr 1</p>',
        data: new Date('March 2, 2017'),
        prezenta: true
      },
      {
        id: 1,
        titlu: 'Meeting2',
        avatar: 'http://lorempixel.com/100/100/',
        descriere: 'Intalnire nr 2',
        data: new Date('June 2, 2017'),
        prezenta: true
      },
      {
        id: 2,
        titlu: 'Meeting3',
        avatar: 'http://lorempixel.com/100/100/',
        descriere: 'Intalnire nr 3',
        data: new Date('December 2, 2017'),
        prezenta: false
      },
      {
        id: 3,
        titlu: 'Meeting4',
        avatar: 'http://lorempixel.com/100/100/',
        descriere: 'Intalnire nr 4',
        data: new Date('January 2, 2018'),
        prezenta: true
      },
      {
        id: 4,
        titlu: 'Meeting5',
        avatar: 'http://lorempixel.com/100/100/',
        data: new Date('March 2, 2018'),
        prezenta: false
      }
    ],
    firebase: {
      db: firebase.database()
    }
  },
  mutations: {
  },
  actions: {
    getData () {
      return this.firebase.db.ref('events/').on('value', snap => {
        console.log(firebase.database())
      })
    }
  },
  getters: {
    events (state) {
      return state.events
    }
  }
})
