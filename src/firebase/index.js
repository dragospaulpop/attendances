import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDx7RPAEcUI-G4ScUCGsFVQRW7mq1ZmkFU',
  authDomain: 'attendances-62382.firebaseapp.com',
  databaseURL: 'https://attendances-62382.firebaseio.com',
  projectId: 'attendances-62382',
  storageBucket: '',
  messagingSenderId: '877869699076'
}

export default firebase.initializeApp(config)

// firebase.database().ref('/events/MYUID')
//   .set({
//     id: 1,
//     titlu: 'Meeting2',
//     avatar: 'http://lorempixel.com/100/100/',
//     descriere: 'Intalnire nr 2',
//     data: new Date('June 2, 2017'),
//     prezenta: true
//   })
