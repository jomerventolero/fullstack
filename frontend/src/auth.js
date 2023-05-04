import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDj5RD4lB1Oj7xLGnKYJx7haq6OhU10DUs",
    authDomain: "auth-68abe.firebaseapp.com",
    projectId: "auth-68abe",
    storageBucket: "auth-68abe.appspot.com",
    messagingSenderId: "61281861594",
    appId: "1:61281861594:web:271b1529719c88abd78ae3",
    measurementId: "G-0B5PCRV2Y7"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
