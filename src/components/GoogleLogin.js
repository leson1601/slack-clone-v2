import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useStateValue } from '../StateProvider';
import { Button } from '@material-ui/core';
import './GoogleLogin.css';
import db from '../db/firebase';

function GoogleLogin() {
  const [{ users }] = useStateValue();
  const login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;

        var user = result.user;

        if (!users.find((item) => item.email === user.email)) {
          db.collection('users').add({
            username: user.displayName,
            email: user.email,
            photo: user.photoURL,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://i.pcmag.com/imagery/reviews/07td46ju7p6lLVb0QGwc5VF-6..v_1569479844.jpg'
          alt=''
        />

        <h1>Sign in to Slack Clone</h1>
        <h2>Author: Son Le</h2>

        <Button onClick={login}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default GoogleLogin;
