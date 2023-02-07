import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDSv0qCB7Y61Crod8l-T54HZIYvlpnFcSo',
    authDomain: 'proyecto-final-bootcamp-18e38.firebaseapp.com',
    projectId: 'proyecto-final-bootcamp-18e38',
    storageBucket: 'proyecto-final-bootcamp-18e38.appspot.com',
    messagingSenderId: '465882818232',
    appId: '1:465882818232:web:256dae5105ee1a4f13f64d',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
