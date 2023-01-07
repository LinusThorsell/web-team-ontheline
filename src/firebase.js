// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore/lite";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUtt6mMFReiZ31a8FaAs_jkxFnGP0nfYg",
  authDomain: "team-ontheline.firebaseapp.com",
  projectId: "team-ontheline",
  storageBucket: "team-ontheline.appspot.com",
  messagingSenderId: "927003698014",
  appId: "1:927003698014:web:2fd1939040224fc8d8a5cf",
  measurementId: "G-566T1R6RGK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

let events = [];
let fetchedEvents = false;
export async function getEvents() {
  if (fetchedEvents) {
    console.log("events already loaded, returning saved values");
    return events;
  }

  console.log("No events found, fetching from database");
  const querySnapshot = await getDocs(collection(db, "events"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    events = [...events, doc.data()];
  });

  fetchedEvents = true;
  return events;
}
