// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);

let events = [];
let news = [];
let team = [];
let mediaDirectory = [];

async function fetchData() {
  const eventsSnapshot = await getDocs(collection(db, "events"));
  eventsSnapshot.forEach((doc) => {
    events = [...events, doc.data()];
  });
  const newsSnapshot = await getDocs(collection(db, "news"));
  newsSnapshot.forEach((doc) => {
    news = [...news, doc.data()];
  });
  const teamSnapshot = await getDocs(collection(db, "team"));
  teamSnapshot.forEach((doc) => {
    team = [...team, {data: doc.data(), id: doc.id}];
  });
  const mediaDirectorySnapshot = await getDocs(
    collection(db, "mediadirectory")
  );

  mediaDirectorySnapshot.forEach((doc) => {
    // build structure we want in object
    let object = {
      docid: doc.id,
      directory: doc.data(),
      images: null,
    };

    mediaDirectory = [...mediaDirectory, object];
  });
}

export async function getMediaImages(mediaObject) {
  // get subcollection of images
  let images = [];

  await getDocs(
    collection(db, "mediadirectory", mediaObject.docid, "images")
  ).then((imgSnapshot) => {
    imgSnapshot.forEach((img) => {
      images.push(img.data());
    });
  });

  return images;
}

let fetched = false;
export async function getEvents() {
  if (fetched) {
    return events;
  }

  await fetchData();
  fetched = true;

  return events;
}

export async function getNews() {
  if (fetched) {
    return news;
  }
  await fetchData();
  fetched = true;

  return news;
}

export async function getTeam() {
  if (fetched) {
    return team;
  }
  await fetchData();
  fetched = true;

  return team;
}

export async function getMediaDirectory() {
  if (fetched) {
    return mediaDirectory;
  }
  await fetchData();
  fetched = true;

  return mediaDirectory;
}

export async function getNextEvent() {
  var nextEventObject = {}
  const nextEventSnapshot = await getDocs(collection(db, "nextevent"));
  nextEventSnapshot.forEach((doc) => {
    nextEventObject = doc.data();
  });
  
  return nextEventObject;
}

export function uploadEvent(event) {
  addDoc(collection(db, "events"), event);
}
export function uploadNews(news) {
  addDoc(collection(db, "news"), news);
}
export function uploadFolder(folder) {
  addDoc(collection(db, "mediadirectory"), folder);
}

export function editTeamMember(documentId, newdata) {
  setDoc(doc(db, "team", documentId), newdata);
}

export function submitNextEvent(newdata) {
  setDoc(doc(db, "nextevent", 'GE4QD3MvZQVzI1vjZQbb'), newdata);
}

export function addImageURLToDatabase(imageURL, folder, width, height) {
  let documentID = mediaDirectory.find(
    (item) => item.directory.foldername === folder
  ).docid;

  addDoc(collection(db, "mediadirectory", documentID, "images"), {
    src: imageURL,
    width: width,
    height: height,
  });
}

export function removeImage(document, url) {
  getDocs(collection(db, "mediadirectory", document, "images")).then(
    (imgSnapshot) => {
      imgSnapshot.forEach((img) => {
        if (img.data().src === url) {
          deleteDoc(doc(db, "mediadirectory", document, "images", img.id));
        }
      });
    }
  );
}
export function removeEvent(eventtoremove) {
  getDocs(collection(db, "events")).then(
    (eventSnapshot) => {
      eventSnapshot.forEach((event) => {
        if (event.data().signup_url === eventtoremove.signup_url) {
          console.log("Successfully found target: ", event)
          deleteDoc(doc(db, "events", event.id));
        }
      });
    }
  );
}
