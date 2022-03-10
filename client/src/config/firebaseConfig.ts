// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyBeLGqE-jHUIyBnm1df5tK6roIYLlZOyjA',
    authDomain: 'online-store-57854.firebaseapp.com',
    projectId: 'online-store-57854',
    storageBucket: 'online-store-57854.appspot.com',
    messagingSenderId: '169004427676',
    appId: '1:169004427676:web:133f34118f97e48036c059',
    measurementId: 'G-D2EM4DEQRW',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const authService = {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
};

export default app;
