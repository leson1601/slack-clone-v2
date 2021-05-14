import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useStateValue } from '../StateProvider';
import { Button } from '@material-ui/core';
import './GoogleLogin.css';

function GoogleLogin() {
  const [, dispatch] = useStateValue();
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
        // The signed-in user info.
        var user = result.user;

        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'SET_USER',
          payload: {
            username: user.displayName,
            email: user.email,
            photo: user.photoURL,
          },
        });
        console.log(user);
      } else {
        dispatch({
          type: 'SET_USER',
          payload: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://i.pcmag.com/imagery/reviews/07td46ju7p6lLVb0QGwc5VF-6..v_1569479844.jpg'
          alt=''
        />

        <h1>Sign in to Slack Clone</h1>

        <Button onClick={login}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default GoogleLogin;
