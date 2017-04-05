import firebase from 'firebase'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDMULTrNLPfrzX7eyXk0MWJpaTgbWVWK_0',
  databaseURL: 'https://moviedb-e7b27.firebaseio.com'
}

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG)
export const firebaseAuth = firebaseApp.auth()
export const firebaseDB = firebaseApp.database()
