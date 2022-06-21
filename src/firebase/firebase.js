import { initializeApp } from "firebase/app";
import { getAuth  , GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAE0rBcAnMO8TBrN23aYOH6GxX93owr1Co",
  authDomain: "linkedin-clone-db7fd.firebaseapp.com",
  projectId: "linkedin-clone-db7fd",
  storageBucket: "linkedin-clone-db7fd.appspot.com",
  messagingSenderId: "298245952083",
  appId: "1:298245952083:web:16481bb1958987f5b56ca6"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const provider = new GoogleAuthProvider()
const storage = getStorage(firebaseApp)

export { auth , provider , storage }
export default db