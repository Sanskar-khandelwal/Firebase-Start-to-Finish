import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// changing the styles of the body page
document.querySelector("body").style.backgroundColor = "#e6e6fa";

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
    console.log(hostels);
  })
  .catch((err) => console.log(err.message));
// adding and deleting document form

const addHostelForm = document.querySelector(".add");
addHostelForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(addHostelForm.name.value);
  console.log(addHostelForm.rating.value);
  console.log(addHostelForm.price.value);
  addDoc(colRef, {
    name: addHostelForm.name.value,
    rating: addHostelForm.rating.value,
    price: addHostelForm.price.value,
  }).then(() => {
    addHostelForm.reset();
  });
});

// deleting documents
const deleteHostelForm = document.querySelector(".delete");

deleteHostelForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "Hostels", deleteHostelForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteHostelForm.reset();
  });
});
