import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/analytics';

const config = {
  apiKey: 'AIzaSyD1LLENtXT64ou7-nTkiK78jQkzDsEE6x0',
  authDomain: 'eiphyapp.firebaseapp.com',
  databaseURL: 'https://eiphyapp.firebaseio.com',
  projectId: 'eiphyapp',
  storageBucket: 'eiphyapp.appspot.com',
  messagingSenderId: '412886813810',
  appId: '1:412886813810:web:97dac96871438ca8b746eb',
  measurementId: 'G-5W3SFZ68Q7',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  firebase.analytics();
}

export default firebase;
