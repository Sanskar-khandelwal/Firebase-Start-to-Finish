import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  // getDocs to get the collection of doc but not in real time
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  // getDoc, to get single doc but not in real time
  updateDoc
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

// firebase queries
const q = query(colRef, orderBy("createdAt"));

//get collection data (everytime we get data we have to reload the page to show it to user)
// const data = getDocs(colRef)
//   .then((snapshot) => {
//     let hostels = [];
//     snapshot.docs.forEach((doc) => {
//       hostels.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(hostels);
//   })
//   .catch((err) => console.log(err.message));

//get real time data
// This function will run everytime there will be a change in collection and once the site first loads

// onSnapshot(colRef, (snapshot) => {
//   let hostels = [];
//   snapshot.docs.forEach((doc) => {
//     hostels.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(hostels);
// });

// it willl only give the data when it matches the query
onSnapshot(q, (snapshot) => {
  let hostels = [];
  snapshot.docs.forEach((doc) => {
    hostels.push({ ...doc.data(), id: doc.id });
  });
  console.log(hostels);
});
// adding and deleting document form
const addHostelForm = document.querySelector(".add");
addHostelForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    name: addHostelForm.name.value,
    rating: addHostelForm.rating.value,
    price: addHostelForm.price.value,
    createdAt: serverTimestamp(),
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

// getting a single document
const docRef = doc(db, 'Hostels', "Uj4fMNydlLcML9L4dN3l");

// this is not the real time data
// getDoc(docRef).then(doc => {
//   console.log(doc.data(), doc.id)
// });


// on snapshot will give the real time data, the call back function will always fire when data will change and also the first time the sites loads
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
});



// updating document.
const updateForm = document.querySelector('.update');

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const docRef = doc(db, "Hostels", updateForm.docid.value);

  updateDoc(docRef, {
    name: 'The Stuti Boys'
  }
  ).then(() => {
    updateForm.reset()
  })
})