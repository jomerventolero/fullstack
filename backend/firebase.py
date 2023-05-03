import pyrebase

config = {
  'apiKey': "AIzaSyDj5RD4lB1Oj7xLGnKYJx7haq6OhU10DUs",
  'authDomain': "auth-68abe.firebaseapp.com",
  'projectId': "auth-68abe",
  'storageBucket': "auth-68abe.appspot.com",
  'messagingSenderId': "61281861594",
  'appId': "1:61281861594:web:271b1529719c88abd78ae3",
  'measurementId': "G-0B5PCRV2Y7"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

username = 'admin'
password = 'celinaplainsadmin'

user = auth.create_user_with_email_and_password(username, password)