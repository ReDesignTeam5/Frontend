import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQkiFpNXcq7OVmfOJshSDqTwlaVzopLvY",
  authDomain: "redesign-2c16e.firebaseapp.com",
  projectId: "redesign-2c16e",
  storageBucket: "redesign-2c16e.appspot.com",
  messagingSenderId: "1019398225375",
  appId: "1:1019398225375:web:7861d4c61911dad6db186a"
};

// Initialize Firebase
initializeApp(firebaseConfig)
const db= getFirestore()

const auth= getAuth()

export { db , auth }