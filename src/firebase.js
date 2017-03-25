import firebase from 'firebase'

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDMULTrNLPfrzX7eyXk0MWJpaTgbWVWK_0",
  authDomain: "moviedb-e7b27.firebaseapp.com",
  databaseURL: "https://moviedb-e7b27.firebaseio.com",
  storageBucket: "moviedb-e7b27.appspot.com",
  messagingSenderId: "775807457532"
}


export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG)
export const firebaseAuth = firebaseApp.auth()
export const firebaseDB = firebaseApp.database()
