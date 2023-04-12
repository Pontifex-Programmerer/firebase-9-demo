// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYcudUl1-MRw9-Co4NFMyh4duhQQjOZPs",
  authDomain: "fir-9-demo-2023.firebaseapp.com",
  projectId: "fir-9-demo-2023",
  storageBucket: "fir-9-demo-2023.appspot.com",
  messagingSenderId: "696690568643",
  appId: "1:696690568643:web:74bdb77f5a205a13a72176"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init services
const db = getFirestore();

// Collection reference
const colRef = collection(db, 'phonelist');

// Get collection data
getDocs(colRef)
    .then( snapshot => {
        const phonelist = [];
        const htmlList = document.querySelector('#phonelist');
        snapshot.docs.forEach( doc => {
            //phonelist.push({...doc.data(), id: doc.id})
            const listItem = createHtmlListItem(doc);
            htmlList.appendChild(listItem);
        });
    })
    .catch( err => {
        console.log(err.message);
    });

const addButton = document.querySelector('#submit');
addButton.addEventListener('click', e => {
    const navn = document.querySelector('#name').value;
    const telefon = document.querySelector('#telefon').value;
    addDoc(colRef, {navn,telefon})
        .then(snapshot => {
            console.log(snapshot);
        })
        .catch(err =>{
            console.log(err.message);
        });
});

function createHtmlListItem(doc){
    console.log(doc.data())
    const liElement = document.createElement('li');
    liElement.setAttribute('data-id', doc.id);
    liElement.classList.add('singleline-headings')

    const nameElement = document.createElement('h3')
    nameElement.appendChild(document.createTextNode(doc.data().navn));
    liElement.appendChild(nameElement);

    const numberElement = document.createElement('h3');
    numberElement.appendChild(document.createTextNode(doc.data().telefon));
    liElement.appendChild(numberElement);

    return liElement;
}