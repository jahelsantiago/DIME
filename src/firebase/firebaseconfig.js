import firebase from "firebase"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "key_here",
  authDomain: "dime-utils.firebaseapp.com",
  projectId: "dime-utils",
  storageBucket: "dime-utils.appspot.com",
  messagingSenderId: "303064992770",
  appId: "1:303064992770:web:a789dd5df54d357ba22b1b"
};



// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage()
export const db = firebase.firestore()






