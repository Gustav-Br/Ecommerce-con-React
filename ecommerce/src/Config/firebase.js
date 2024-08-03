import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC0HCcXe-N5vbKc0CV8nk13n4gWClgPmVQ",
    authDomain: "ec2024react.firebaseapp.com",
    projectId: "ec2024react",
    storageBucket: "ec2024react.appspot.com",
    messagingSenderId: "863757242796",
    appId: "1:863757242796:web:c983610b9da8a06474ea09"
};

firebase.initializeApp(firebaseConfig);

export default firebase;