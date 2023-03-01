import firebase from "firebase";
import { initializeApp } from "firebase/app";
import {getDatabase, set, get, update, remove, ref, child} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAGI0hXn7InaWPURmSwXrioImeDpwWk4HU",
  authDomain: "tweets-db.firebaseapp.com",
  projectId: "tweets-db",
  storageBucket: "tweets-db.appspot.com",
  messagingSenderId: "546663242332",
  appId: "1:546663242332:web:d542912c01149244712499",
  measurementId: "G-BKFS1KV80H"
};
const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebaseapp.firestore()

export default db;