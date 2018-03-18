import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    },
  mutations: {
  }
})