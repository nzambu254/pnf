// Import Firebase core and required services
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8Ly0TLO4y1d1QgSABOPkr1HEqSZKC2B4",
  authDomain: "primeno-696eb.firebaseapp.com",
  projectId: "primeno-696eb",
  storageBucket: "primeno-696eb.appspot.com",
  messagingSenderId: "446781126402",
  appId: "1:446781126402:web:e24546afe884fe7ab5b41b"
}

// Initialize Firebase app
const app = initializeApp(firebaseConfig)

// Export initialized services
export const db = getFirestore(app)
export const auth = getAuth(app)


