/**
 * ILIMNI — Firebase initialization (compat SDK)
 * Loaded after the Firebase compat <script> tags in index.html,
 * before learning/content.js / app.js. Exposes window.firebaseAuth and
 * window.firebaseDb as globals for app.js to use.
 */
(function () {
  "use strict";

  var firebaseConfig = {
    apiKey: "AIzaSyDNuAfWdsR3_C3olPPeZgjwmy5QSdzJJgc",
    authDomain: "ilimni-angelo.firebaseapp.com",
    projectId: "ilimni-angelo",
    storageBucket: "ilimni-angelo.firebasestorage.app",
    messagingSenderId: "96890799894",
    appId: "1:96890799894:web:89486c162dd77727be3237"
  };

  firebase.initializeApp(firebaseConfig);

  window.firebaseAuth = firebase.auth();
  window.firebaseDb = firebase.firestore();
})();
