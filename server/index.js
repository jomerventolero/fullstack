const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./celina-plains-firebase-adminsdk-chhjg-899b477033.json'); 

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 3000;
const auth = admin.auth();

app.use(cors());
app.use(express.json());


app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({ email, password });
    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/make-appointment', async (req, res) => {
  const { email, phoneNumber, appointmentTime, message } = req.body;

  try {
    const appointment = {
      email,
      phoneNumber,
      appointmentTime,
      message
    };

    // Save the appointment to Firestore with a unique ID
    const appointmentRef = await admin.firestore().collection('appointments').doc();
    await appointmentRef.set(appointment);
    
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/get-appointments', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('appointments').get();
    const appointments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});


app.post('/move-appointment', async (req, res) => {
  const { appointmentId, ...additionalFields } = req.body;
  if (!appointmentId) {
    res.status(400).json({ message: 'Missing appointment ID' });
    return;
  }
  try {
    const appointmentRef = admin.firestore().collection('appointments').doc(appointmentId);
    const appointmentSnapshot = await appointmentRef.get();

    if (!appointmentSnapshot.exists) {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }

    const appointmentData = appointmentSnapshot.data();

    // Add the appointment to the "completed-appointments" collection
    const completedAppointmentRef = admin.firestore().collection('done-appointments').doc(appointmentId);
    await completedAppointmentRef.set({ ...appointmentData, ...additionalFields });

    // Delete the appointment from the "appointments" collection
    await appointmentRef.delete();

    res.status(200).json({ message: 'Appointment moved successfully' });
  } catch (error) {
    console.error('Error moving appointment:', error);
    res.status(500).json({ message: 'Error moving appointment' });
  }
});


app.delete('/delete-appointment/:appointmentId', async (req, res) => {
  const appointmentId = req.params.appointmentId;

  try {
    const appointmentRef = admin.firestore().collection('appointments').doc(appointmentId);
    const appointmentSnapshot = await appointmentRef.get();

    if (!appointmentSnapshot.exists) {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }

    // Delete the appointment
    await appointmentRef.delete();

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Error deleting appointment' });
  }
});


const verifyIdToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(403).json({ error: 'No token provided' });
    }
  
    const [scheme, token] = authHeader.split(' ');
  
    if (scheme !== 'Bearer') {
      return res.status(403).json({ error: 'Invalid token format' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.uid = decodedToken.uid;
      next();
    } catch (error) {
      res.status(403).json({ error: 'Invalid token' });
    }
  };


  app.get('/appointments', verifyIdToken, async (req, res) => {
    try {
      const appointmentsRef = admin.firestore().collection('appointments').doc(req.uid);
      const doc = await appointmentsRef.get();
      if (doc.exists) {
        const appointments = doc.data().appointments || [];
        res.status(200).json(appointments);
      } else {
        res.status(200).json([]); // No appointments found, return an empty array
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = auth;