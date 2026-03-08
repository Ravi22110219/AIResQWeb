import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA8x1ZNO5YpeupC9ccnmVoAKi_X1WDUg5s',
  authDomain: 'airesq-auth.firebaseapp.com',
  projectId: 'airesq-auth',
  storageBucket: 'airesq-auth.appspot.com', // Ensure the storage bucket URL matches your Firebase project
  messagingSenderId: '208071021439',
  appId: '1:208071021439:web:3ab6440b0474e065ba804a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)

// Function to upload a file to Firebase Storage
export const uploadFileToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `resumes/${file.name}`) // Creates a folder named "resumes" in Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      null,
      (error) => reject(error), // Handle upload errors
      () => {
        // Get the download URL after successful upload
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => resolve(downloadURL))
          .catch((error) => reject(error))
      }
    )
  })
}

export default app
