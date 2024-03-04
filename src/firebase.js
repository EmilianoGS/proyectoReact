import firebase from  'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyAUEsr4E_ysw7ZkvBQvHb-AlB0McP9EWUo",
    authDomain: "proyecto1-cb1b1.firebaseapp.com",
    projectId: "proyecto1-cb1b1",
    storageBucket: "proyecto1-cb1b1.appspot.com", 
    messagingSenderId: "668791776701",
    appId: "1:668791776701:web:ea1b3a8a6234d3ff471ed4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
  firebase.auth=firebase.auth();
  firebase.db=db;


  export default firebase;