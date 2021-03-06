//firebase SDK
import { initializeApp } from "firebase/app";

//firestore for database
import { getFirestore, collection, addDoc } from "firebase/firestore";

//get authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

//analytics
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCgUnsPaHZpVW_we6RGHq8MPOk8p-PJWcc",
  authDomain: "chemazu-ecommerce.firebaseapp.com",
  projectId: "chemazu-ecommerce",
  storageBucket: "chemazu-ecommerce.appspot.com",
  messagingSenderId: "233678618539",
  appId: "1:233678618539:web:e1e4866fe160dac3101cee",
  measurementId: "G-FZFBCREQER",
};

//intializing firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

//intialize sign in with google
const provider = new GoogleAuthProvider();

const addData = async (name: string, data: {}) => {
  try {
    const docRef = await addDoc(collection(db, name), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const createUser = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;

      if (user.uid) {
        alert(`Hi ${firstName},your account has been created`);

        //get the data for the user
        const { uid, metadata } = user;

        // get the creation time of the account
        const { creationTime } = metadata;

        //add user to db
        addData("users", {
          displayName: `${firstName} ${lastName}`,
          email,
          uid,
          creationTime,
        });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
};

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);

      const { displayName, email, uid, photoURL, metadata } = user;
      const { creationTime } = metadata;

      addData("users", {
        displayName,
        email,
        uid,
        creationTime,
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export default app;
export { createUser, addData, signInWithGoogle };
