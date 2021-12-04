import firebase, { firestore } from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyArP1K6aV8LhPbh7zxbTYlEJjmr7YMPz0Y",
        authDomain: "hakentalk.firebaseapp.com",
        databaseURL: "https://hakentalk.firebaseio.com",
        projectId: "hakentalk",
        storageBucket: "hakentalk.appspot.com",
        messagingSenderId: "511178607716",
        appId: "1:511178607716:web:e0dc6e2cd97d74eb616371"
    })
}

export const authProviders = {
    Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
}

export const auth = firebase.auth()
// export const settings = { timestampsInSnapshots: true }
// firestore.settings(settings)
export default firebase