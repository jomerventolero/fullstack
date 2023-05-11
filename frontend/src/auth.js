import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  "apiKey": "AIzaSyDgUhoEXbNN0srYqKEnMGB-sxLUvefDCAY",
  "authDomain": "celina-plains.firebaseapp.com",
  "projectId": "celina-plains",
  "storageBucket": "celina-plains.appspot.com",
  "messagingSenderId": "548419353377",
  "appId": "1:548419353377:web:2e189f24b9005975451c60",
  "measurementId": "G-JHF5KF4110"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const db = app.firestore();

const handleSave = ({setIsSaving}) => {
  setIsSaving(true);
  // Save the monthly dues data to Firestore for the current user
  const currentUser = app.auth().currentUser;
  if (currentUser) {
    const userId = currentUser.uid;
    const db = app.firestore();
    db.collection('monthly-dues')
      .doc(userId)
      .set({ monthlyDues })
      .then(() => {
        setIsSaving(false);
      })
      .catch(error => {
        console.error('Error saving monthly dues:', error);
        setIsSaving(false);
      });
  }
};

const handleMonthChange = (monthIndex, event) => {
  const value = parseFloat(event.target.value) || 0;
  setMonthlyDues(prevMonthlyDues => {
    const newMonthlyDues = [...prevMonthlyDues];
    newMonthlyDues[monthIndex] = value;
    return newMonthlyDues;
  });
};

export { auth, db, app, handleMonthChange, handleSave };
