// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getStorage, ref, uploadBytes} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjjpPuw4oNFtXOvw2A6fStUrnQCiVyNHg",
  authDomain: "exampleblog2-929d5.firebaseapp.com",
  projectId: "exampleblog2-929d5",
  storageBucket: "exampleblog2-929d5.appspot.com",
  messagingSenderId: "982829268999",
  appId: "1:982829268999:web:ad7758344d77af95c96aa2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export function uploadFile(file, fileID) {
  const storageRef = ref(storage, 'some-child')
  uploadBytes(storageRef, file).then(snapshot => {
    console.log(snapshot)
  })
}