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
  const { uid, description, date } = req.body;

  try {
    const userRef = admin.firestore().collection('appointments').doc(uid);
    const appointment = { description, date };
    await userRef.set({ appointments: admin.firestore.FieldValue.arrayUnion(appointment) }, { merge: true });
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/get-appointments', async (req, res) => {
  try {
    const snapshot = await database.ref('/appointments').once('value');
    const appointments = snapshot.val() || {};
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// API endpoint for creating an appointment
app.post('/api/appointments', async (req, res) => {
  const { email, phoneNumber, appointmentTime, message } = req.body;

  if (!email || !phoneNumber || !appointmentTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newAppointment = {
      email,
      phoneNumber,
      appointmentTime,
      message: message || '',
    };

    const appointmentRef = await database.ref('/appointments').push(newAppointment);
    const savedAppointment = { id: appointmentRef.key, ...newAppointment };

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Error creating appointment' });
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


app.get('/test', async (req, res) => {
    res.status(200).json({ message: 'Success!' });
    });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = auth;