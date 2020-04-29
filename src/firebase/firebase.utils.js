import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyCtR1f_Px0fLoRY63vYONOyfmYOBX16qGQ',
  authDomain: 'linking-sphere.firebaseapp.com',
  databaseURL: 'https://linking-sphere.firebaseio.com',
  projectId: 'linking-sphere',
  storageBucket: 'linking-sphere.appspot.com',
  messagingSenderId: '740007692007',
  appId: '1:740007692007:web:201c5221ce0551e1968442',
  measurementId: 'G-JX1M7RWN8Z',
}
firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  let userRef = firestore.doc(`users/${userAuth.uid}`)

  let snapShot = await userRef.get()

  if (!snapShot.exists) {
    let { displayName, email, uid } = userAuth
    let avatarUrl = ''
    let levels = 0
    let createdAt = new Date()
    let professionals = [
      { name: 'UX\\UI Designers', value: false },
      { name: 'Graphic Designers', value: false },
      { name: 'Web Designers', value: false },
      { name: 'Animators', value: false },
      { name: 'Film Makers', value: false },
      { name: 'Programmers', value: false },
    ]

    try {
      await userRef.set({
        uid,
        displayName,
        email,
        avatarUrl,
        createdAt,
        professionals,
        levels,
        ...additionalData,
      })
      storage
        .ref()
        .child('avatars/default')
        .getDownloadURL()
        .then(url => {
          userRef.update({
            avatarUrl: url,
          })
        })
    } catch (error) {
      return error.json()
    }
  }
  return userRef
}

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
