import firebase from "firebase"


const firebaseConfig = {
    apiKey: "****",
    authDomain: "tik-tok-clone-3ce41.firebaseapp.com",
    projectId: "tik-tok-clone-3ce41",
    storageBucket: "tik-tok-clone-3ce41.appspot.com",
    messagingSenderId: "844007036336",
    appId: "1:844007036336:web:7c0dd69c4662d9ed413275",
    measurementId: "G-RSL8VKZ044"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()
  const storage = firebase.storage()
  const db = firebaseApp.firestore();

  export { auth, provider, db, storage }
