// database/firebaseDb.js

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBsZu9mNn0m3WRh2bbqFEtVh_AeIhTAiDE",
    authDomain: "mark-practice.firebaseapp.com",
    databaseURL: "https://mark-practice.firebaseio.com",
    projectId: "mark-practice",
    storageBucket: "mark-practice.appspot.com",
    messagingSenderId: "530870938747",
    appId: "1:530870938747:ios:36fefb4cd11abc0372c6de"
};

firebase.initializeApp(firebaseConfig);

export default firebase;