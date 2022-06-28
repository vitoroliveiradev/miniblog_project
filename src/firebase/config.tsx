import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBB-5xRbkjcU94TzyORNdmx5j_pR10zA14",
  authDomain: "miniblog-4c1fd.firebaseapp.com",
  projectId: "miniblog-4c1fd",
  storageBucket: "miniblog-4c1fd.appspot.com",
  messagingSenderId: "59148150111",
  appId: "1:59148150111:web:1ec2d78f93befc794742ea"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };


