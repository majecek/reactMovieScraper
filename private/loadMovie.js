// var dirToJson = require('dir-to-json');
const readdirp = require('readdirp');
const firebase = require('firebase');
var admin = require("firebase-admin");

var serviceAccount = require("./../private/moviedb-e7b27-firebase-adminsdk-sw659-c358890006.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://moviedb-e7b27.firebaseio.com"
});



readdirp({root: '/Volumes/WD6/Movies', fileFilter: ['*.mkv', '*.avi', '*.mp4', '*.m4v', '*.flv'], depth: 0})
  .on('data', function (entry) {
    // do something with each JavaScript file entry
    // console.log(entry.path);
    saveMovie(entry.path);
    // firebaseDB.ref('movies').push().set({
    //   name: entry.path
    // })
  });

function saveMovie(movieName) {
  var movieRef = admin.database().ref('movies').push();
  movieRef.child('name').set(movieName);

}


// const firebaseDB = admin.database;
// admin.database.enableLogging(true);
// admin.database.ref("users").set({
//   name: 'ada'
// });


// We've written 'Ada' to the Database location storing Ada's first name,
// and 'Lovelace' to the location storing her last name.

  // console.log('admin',admin.database.ServerValue.TIMESTAMP, ' ',admin.database().ref("users/ada"));