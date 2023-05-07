const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./celina-plains-firebase-adminsdk-chhjg-899b477033.json'); 
const { v4: uuidv4 } = require('uuid');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 3000;
const auth = admin.auth();

app.use(cors());
app.use(express.json());

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

// Middleware to validate Firebase ID token
const validateFirebaseIdToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error validating Firebase ID token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


// Sign-up endpoint retrieve the user's email and password from the request body and send to firebase backend.
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

// GET: allow anyone to retrieve news-feed data from the database
app.get('/news-feed', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('news-feed').get();
    const newsFeed = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const imageBase64 = await getImageBase64(data.imageUrl);
      const newsItem = { id: doc.id, ...data, imageBase64 };
      newsFeed.push(newsItem);
    }

    res.json(newsFeed);
  } catch (error) {
    console.error('Error fetching news feed:', error);
    res.status(500).json({ message: 'Error fetching news feed' });
  }
});

const getImageBase64 = async (imageUrl) => {
  try {
    const imagebase = admin.firestore().collection('news-feed').doc(imageUrl);
    return `data:image/jpeg;base64,${imagebase}`;
  } catch (error) {
    console.error('Error fetching image:', error.response);
    return null;
  }
};

// POST : endpoint for uploading news feed, restrict user upload to 
// admin level privileges
app.post('/upload-news-feed', validateFirebaseIdToken, async (req, res) => {
  const { postTitle, postCaption, imageBase64 } = req.body;

  try {
    // Generate a unique filename for the image
    const filename = `${uuidv4()}.jpg`;

    // Save the image as a base64 string in Firestore
    const imageRef = admin.firestore().collection('news-feed').doc(filename);
    await imageRef.set({ data: imageBase64 });

    // Save the news feed data to Firestore with the image reference
    const newsFeedData = {
      postTitle,
      postCaption,
      imageRef: imageRef.path,
      createdAt: admin.firestore.Timestamp.now().toDate().toISOString(),
    };

    const docRef = await admin.firestore().collection('news-feed').add(newsFeedData);

    res.status(201).json({ message: 'News feed uploaded successfully', newsFeedId: docRef.id });
  } catch (error) {
    console.error('Error uploading news feed:', error);
    res.status(500).json({ message: 'Error uploading news feed' });
  }
});

// POST: retrieve all appointments on the database
// 
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

// POST /create-user endpoint to create a new user document
// in the users collection
// This endpoint is protected by Firebase Authentication
// and can only be accessed by a logged in user
// The user's UID and email are automatically populated
// in the request object
app.post('/create-user', validateFirebaseIdToken, async (req, res) => {
  try {
    const { uid, email, phoneNumber } = req.user;
    const { firstName, lastName, dateOfBirth, address, gender } = req.body;

    const userRef = admin.firestore().collection('users').doc(uid);
    await userRef.set({
      firstName,
      lastName,
      dateOfBirth,
      address,
      gender,
      email,
      phoneNumber,
    });

    const duesRef = userRef.collection('monthlyDues').doc('dues');
    await duesRef.set({
      // add any other fields as needed
      
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = auth;