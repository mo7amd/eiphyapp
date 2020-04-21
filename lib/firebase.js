import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBhQc1hhUM_WfrOm1uchP18z8cayNuawFo',
  authDomain: 'eiphyappfinal.firebaseapp.com',
  databaseURL: 'https://eiphyappfinal.firebaseio.com',
  projectId: 'eiphyappfinal',
  storageBucket: 'eiphyappfinal.appspot.com',
  messagingSenderId: '851352675581',
  appId: '1:851352675581:web:2c102612e179aba8ee8a94',
  measurementId: 'G-6EKXZDW9MS',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  process.browser && firebase.analytics();
}

export default firebase;
export const db = firebase.firestore();
export const storage = firebase.storage();
