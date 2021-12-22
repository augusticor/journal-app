import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBm4SGleKIoIN2olqAyNZK_k15ISDzBwn0',
	authDomain: 'journal-appa.firebaseapp.com',
	projectId: 'journal-appa',
	storageBucket: 'journal-appa.appspot.com',
	messagingSenderId: '244647352775',
	appId: '1:244647352775:web:ab3ce20839de63d4eba1e2',
};

initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider, getAuth, signInWithPopup };
