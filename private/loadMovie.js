const readdirp = require('readdirp')
// const firebase = require('firebase');
var admin = require('firebase-admin')
const _ = require('lodash')

var serviceAccount = require('./moviedb-e7b27-firebase-adminsdk-sw659-c358890006.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://moviedb-e7b27.firebaseio.com'
})

readdirp({root: '/Volumes/WD6/Movies', fileFilter: ['*.mkv', '*.avi', '*.mp4', '*.m4v', '*.flv'], depth: 1})
  .on('data', (entry) => {
    const name = entry.path.slice(0, entry.path.indexOf('(') - 1)
    const year = Number(entry.path.slice(entry.path.indexOf('(') + 1, entry.path.indexOf(')')))
    const yearFixed = Number.isNaN(year) ? Number(1900) : year
    console.log(entry.path, '==> ', name, year, yearFixed)
    // saveMovie(entry, name, yearFixed)
  })

function saveMovie (entry, name, year) {
  var movieRef = admin.database().ref('movies').push()
  movieRef.child('name').set(entry.path)
  movieRef.child('title').set(name)
  movieRef.child('year').set(year)
}
