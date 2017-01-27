import * as firebase from 'firebase';

var provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;

  var user = result.user

}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});

firebase.auth().signInWithRedirect(provider);
