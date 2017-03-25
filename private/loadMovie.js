const readdirp = require('readdirp');
// const firebase = require('firebase');
var admin = require("firebase-admin");

var serviceAccount = require("./moviedb-e7b27-firebase-adminsdk-sw659-c358890006.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://moviedb-e7b27.firebaseio.com"
});


readdirp({root: '/Volumes/WD6/Movies', fileFilter: ['*.mkv', '*.avi', '*.mp4', '*.m4v', '*.flv'], depth: 1})
  .on('data', function (entry) {
    console.log(entry)
    if (entry.path)
    // saveMovie(entry.path);
  });

function saveMovie(movieName) {
  var movieRef = admin.database().ref('movies').push();
  movieRef.child('name').set(movieName);

}
