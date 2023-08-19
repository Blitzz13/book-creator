import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBECWzJ9IjGNUMNamwzQ2eJKinuBhNr6QA",
    authDomain: "book-creator-9f7b6.firebaseapp.com",
    projectId: "book-creator-9f7b6",
    storageBucket: "book-creator-9f7b6.appspot.com",
    messagingSenderId: "935615103545",
    appId: "1:935615103545:web:02d2ea6bfbe10fd03b43e8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
