const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./celina-plains-firebase-adminsdk-chhjg-899b477033.json'); 
const { v4: uuidv4 } = require('uuid');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


/* These lines of code are setting up an Express server. */
const app = express();
const port = process.env.PORT || 3000;
const auth = admin.auth();
const db = admin.firestore();

/* `app.use(cors())` enables Cross-Origin Resource Sharing (CORS) for the Express server, allowing it
to receive requests from other domains. `app.use(express.json())` is middleware that parses incoming
requests with JSON payloads and makes the resulting data available on the `req.body` property of the
request object. This allows the server to handle JSON data sent in the request body. */
app.use(cors());
app.use(express.json());

/**
 * This function verifies the validity of a token provided in the authorization header of a request.
 * @param req - The `req` parameter is an object that represents the HTTP request made to the server.
 * It contains information about the request, such as the request headers, request body, request
 * method, and request URL.
 * @param res - `res` is the response object that will be sent back to the client making the request.
 * It contains methods and properties that allow you to send a response back to the client, such as
 * `status()` to set the HTTP status code, `json()` to send a JSON response, and `send
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It is typically used to move on to the next step in the request-response cycle.
 * @returns The function `verifyIdToken` is not returning anything. It is a middleware function that is
 * being used to verify the authenticity of a token in the `Authorization` header of an incoming
 * request. If the token is valid, it sets the `uid` property on the `req` object and calls the
 * `next()` function to pass control to the next middleware function. If the token is invalid,
 */
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

/**
 * This function validates a Firebase ID token in a request header and sets the decoded token as a
 * property on the request object.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the headers, body, and query parameters.
 * @param res - `res` stands for response. It is an object that represents the HTTP response that will
 * be sent back to the client. It contains information such as the status code, headers, and body of
 * the response. In this code snippet, `res` is used to send a response with a status code
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It is typically used to move on to the next function after the current function has
 * completed its task.
 * @returns If the `authorization` header is missing or does not start with "Bearer ", a 401
 * Unauthorized response with a JSON message "Unauthorized" is returned. If the `idToken` cannot be
 * verified or decoded, a 401 Unauthorized response with a JSON message "Unauthorized" is returned.
 * Otherwise, the `decodedToken` is assigned to `req.user` and the `next()` middleware function is
 */
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


/* This code defines an endpoint for user signup. When a POST request is made to the '/signup'
endpoint, the function retrieves the email and password from the request body. It then uses the
Firebase Admin SDK to create a new user with the provided email and password. If the user is created
successfully, it sends a response to the client with the user's unique ID (UID). If there is an
error during the process, it sends an error response with the error message. */
app.post('/signup', async (req, res) => {
  const { fullname, email, password, isAdmin } = req.body;
  try {
    if (!fullname) {
      return res.status(400).send({ message: 'Full name is required' });
    }

    // Create a new user
    const userRecord = await auth.createUser({
      email: email,
      password: password,
    });

    // Save the user's profile information in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      userFullname: fullname,
      isAdmin: isAdmin,
    });

    res.send({ message: 'User registered successfully', userId: userRecord.uid });
  } catch (error) {
    console.error('Error creating new user:', error);
    res.status(500).send({ message: 'Error creating new user' });
  }
});


/* This code defines an endpoint for creating a new appointment. When a POST request is made to the
'/make-appointment' endpoint, the function retrieves the appointment details (email, phone number,
appointment time, and message) from the request body. It then creates a new appointment object with
these details and saves it to the Firestore database with a unique ID. Finally, it sends a response
to the client with a success message. If there is an error during the process, it sends an error
response with the error message. */
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


// Define the API endpoint to retrieve the user's fullname
app.get('/userFullname', async (req, res) => {
  try {
    // Extract the user ID from the request, assuming you've set it in the request headers or cookies
    const userId = req.headers['user-id']; // Update with your preferred header or cookie name

    // Retrieve the user document from Firestore
    const userDoc = await admin.firestore().collection('users').doc(userId).get();

    // Extract the userFullname field from the user document
    const userFullname = userDoc.exists ? userDoc.data().userFullname : null;

    res.json({ userFullname });
  } catch (error) {
    console.error('Error fetching userFullname:', error);
    res.status(500).json({ error: 'An error occurred while fetching userFullname' });
  }
});


/* The below code is defining a route in a Node.js/Express application that handles a GET request to
retrieve all appointments from a Firestore database. It uses the Firebase Admin SDK to access the
database and retrieve the appointments collection. It then maps the documents in the collection to
an array of appointment objects and sends the array as a JSON response to the client. If there is an
error fetching the appointments, it logs the error and sends a 500 status code with an error
message. */
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


/* The below code is defining an endpoint for a POST request to move an appointment from the
"appointments" collection to the "done-appointments" collection in Firestore. The endpoint expects a
request body with an appointment ID and additional fields to be added to the appointment data. If
the appointment ID is missing or not found in the "appointments" collection, the endpoint returns an
error response. If the appointment is successfully moved to the "done-appointments" collection, the
endpoint returns a success response. */
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


/* The below code is defining an HTTP DELETE endpoint for deleting an appointment from a Firestore
database. It takes the appointment ID as a parameter from the request URL, checks if the appointment
exists in the database, and if it does, deletes it. If the appointment is not found, it returns a
404 error message, and if there is an error during the deletion process, it returns a 500 error
message. */
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


/* The below code is defining a route for the "/news-feed" endpoint in an Express.js app. When a GET
request is made to this endpoint, the code retrieves all documents from the "news-feed" collection
in Firestore, converts the image URL of each document to a base64-encoded string using the
getImageBase64 function, and constructs an array of news items with the document data and the
base64-encoded image. Finally, the code sends the array of news items as a JSON response. If there
is an error during this process, the code logs the error and sends a 500 status code with */
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

/**
 * This function retrieves an image from a Firestore collection and returns it as a base64 encoded
 * string.
 * @param imageUrl - The parameter `imageUrl` is a string representing the URL of an image that needs
 * to be fetched and converted to a base64 encoded string.
 * @returns a string that represents the base64 encoded image data of the image located at the provided
 * `imageUrl`. The string is formatted as a data URI with a MIME type of `image/jpeg`. If there is an
 * error fetching the image, the function returns `null`.
 */
const getImageBase64 = async (imageUrl) => {
  try {
    const imagebase = admin.firestore().collection('news-feed').doc(imageUrl);
    return `data:image/jpeg;base64,${imagebase}`;
  } catch (error) {
    console.error('Error fetching image:', error.response);
    return null;
  }
};



/* The below code is defining an endpoint for uploading news feed data to Firestore in a Node.js app.
The endpoint expects a POST request with a JSON body containing postTitle, postCaption, and
imageBase64 properties. The code generates a unique filename for the image, saves the image as a
base64 string in Firestore, and saves the news feed data to Firestore with the image reference.
Finally, the code sends a response with a success message and the ID of the newly created news feed
document. */
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


/* The below code is defining a route handler for the GET request to '/appointments'. It first verifies
the ID token of the user making the request using the 'verifyIdToken' middleware. Then, it retrieves
the appointments data for the user with the given UID from the Firestore database. If the user has
appointments, it returns them as a JSON response with a 200 status code. If the user has no
appointments, it returns an empty array with a 200 status code. If there is an error, it returns a
JSON response with a 500 status code and an error message. */
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


/* The below code is creating an endpoint for creating a new user in a Firebase Firestore database. It
first validates the Firebase ID token of the user making the request, then extracts relevant user
information from the request body and creates a new document in the "users" collection with the
user's information. It also creates a new document in the "monthlyDues" subcollection for the user.
If successful, it returns a 201 status code with a success message, otherwise it returns a 500
status code with an error message. */
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


/* The code below is defining a route for retrieving monthly dues data for a specific user. It uses the
Express.js framework and the HTTP GET method. The route is defined as '/users/:userId/monthly-dues',
where ':userId' is a parameter that represents the ID of the user whose monthly dues data is being
retrieved. */
app.get('/users/:userId/monthly-dues', async (req, res) => {
  const { userId } = req.params;

  try {
    // Retrieve the document for the specified user
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      res.status(404).send('User not found');
      return;
    }

    // Retrieve the monthly dues data from the user document
    const { duesByDate } = userDoc.data();

    res.json(duesByDate);
  } catch (error) {
    console.error('Error retrieving monthly dues:', error);
    res.status(500).send('An error occurred');
  }
});


/* The monthly-dues code is defining an endpoint for a GET request to retrieve data from a Firebase Firestore
database collection called "monthly-dues". It retrieves all the documents in the collection and
creates an array of objects containing the document ID, user's full name, and monthly dues amount.
The data is then returned as a JSON response. If there is an error, it logs the error and returns a
500 status code with an error message. */
app.get('/monthly-dues', async (req, res) => {
  try {
    const db = firebase.firestore();
    const monthlyDuesData = [];
    const querySnapshot = await db.collection('monthly-dues').get();
    querySnapshot.forEach(doc => {
      const { userFullname, monthlydues } = doc.data();
      monthlyDuesData.push({
        id: doc.id,
        userFullname,
        monthlydues: parseFloat(monthlydues),
      });
    });
    res.json(monthlyDuesData);
  } catch (error) {
    console.error('Error fetching monthly dues:', error);
    res.status(500).json({ error: 'Could not fetch monthly dues data' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
/* The above code is starting a server and listening on a specified port. When the server starts
running, it will log a message to the console indicating the port number on which the server is
running. */