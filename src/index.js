import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDikyfOski3dzoQ7a-0ZnA_7l65AkCdc3A",
  authDomain: "hostel-in-india.firebaseapp.com",
  projectId: "hostel-in-india",
  storageBucket: "hostel-in-india.appspot.com",
  messagingSenderId: "946643087585",
  appId: "1:946643087585:web:dffbbae977a6fdf02847a0",
  measurementId: "G-GRVQDP0L0T",
};

//init firebase app
initializeApp(firebaseConfig);

// init sevices
const db = getFirestore();

//  collection ref
const colRef = collection(db, "Hostels");

console.log(colRef);

//get collection data
const data = getDocs(colRef)
  .then((snapshot) => {
    let hostels = [];
    snapshot.docs.forEach((doc) => {
      hostels.push({ ...doc.data(), id: doc.id });
    });
  })
  .catch((err) => console.log(err.message));

console.log(data);
