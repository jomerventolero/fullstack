const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./auth-68abe-firebase-adminsdk-8ntjw-dc939c0437.json'); // Replace with the name of your JSON file

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

app.post('/signin', async (req, res) => {
  // Firebase Admin SDK does not provide a direct method for user sign-in.
  // You should use Firebase client SDK for user sign-in on the client side.
  // For server-side, you can verify ID tokens after a user signs in on the client-side.
  const { email, password } = req.body;
  try {
    await auth.getToken;
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/appointment', async (req, res) => {
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