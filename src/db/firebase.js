// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB_n2eY1h1RjWdPxRArOBReG40fKVkg-aM',
  authDomain: 'slack-clone-v2-378d9.firebaseapp.com',
  projectId: 'slack-clone-v2-378d9',
  storageBucket: 'slack-clone-v2-378d9.appspot.com',
  messagingSenderId: '124828299196',
  appId: '1:124828299196:web:72b3785e2713c1a43185b9',
  measurementId: 'G-JPL38DMRJ4',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
