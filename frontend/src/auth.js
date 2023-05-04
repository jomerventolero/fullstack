import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDgUhoEXbNN0srYqKEnMGB-sxLUvefDCAY",
  authDomain: "celina-plains.firebaseapp.com",
  projectId: "celina-plains",
  storageBucket: "celina-plains.appspot.com",
  messagingSenderId: "548419353377",
  appId: "1:548419353377:web:2e189f24b9005975451c60",
  measurementId: "G-JHF5KF4110"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();

export { auth };
