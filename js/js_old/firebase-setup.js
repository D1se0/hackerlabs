// firebase-setup.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5D78a8rkxUbRLPJ1okQ1nfPIU2ZxTJ_M",
    authDomain: "hackerlabs-b6d4a.firebaseapp.com",
    projectId: "hackerlabs-b6d4a",
    storageBucket: "hackerlabs-b6d4a.appspot.com",
    messagingSenderId: "733175854086",
    appId: "1:733175854086:web:86107c184b11d2a7433f87",
    measurementId: "G-CWC2ZD8Z8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
