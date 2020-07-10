import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC3NP7isoD_Yabd0kS3YcmX1rVEtmJNQRw",
  authDomain: "dupin-store.firebaseapp.com",
  databaseURL: "https://dupin-store.firebaseio.com",
  projectId: "dupin-store",
  storageBucket: "dupin-store.appspot.com",
  messagingSenderId: "887201412064",
  appId: "1:887201412064:web:fafd3a1659dc2306c0f185",
  measurementId: "G-FFG5Z9E3EX"
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
