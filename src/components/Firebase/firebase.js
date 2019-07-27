import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDEwLsAke5jY51x3dqP3pvhgjE18mxnCuM',
  authDomain: 'react-with-firebase-cdae2.firebaseapp.com',
  databaseURL: 'https://react-with-firebase-cdae2.firebaseio.com',
  projectId: 'react-with-firebase-cdae2',
  storageBucket: 'react-with-firebase-cdae2.appspot.com',
  messagingSenderId: '323171030228',
  appId: '1:323171030228:web:4e2140c83499d722'
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Auth API *** //
  // ref() method match the location where entities(users) will be stored in Firebase realtime database
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

export default Firebase;
