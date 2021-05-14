import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useStateValue } from './StateProvider';
import db from './db/firebase';
import ChatContainer from './components/ChatContainer';
import GoogleLogin from './components/GoogleLogin';
import firebase from 'firebase/app';

function App() {
  // const [state, dispatch] = useStateValue();
  const [{ user, users }, dispatch] = useStateValue();

  useEffect(() => {
    // set channels
    db.collection('rooms').onSnapshot((snapshot) => {
      dispatch({
        type: 'SET_CHANNELS',
        payload: snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        })),
      });
    });
  }, [dispatch]);

  useEffect(() => {
    // set users
    db.collection('users').onSnapshot((snapshot) => {
      dispatch({
        type: 'SET_USERS',
        payload: snapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username,
          email: doc.data().email,
          photo: doc.data().photo,
        })),
      });
    });
  }, [dispatch, users]);

  useEffect(() => {
    // set logged in user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'SET_USER',
          payload: users.find((item) => item.email === user.email),
        });
      } else {
        dispatch({
          type: 'SET_USER',
          payload: null,
        });
      }
    });
  }, [dispatch, users]);

  return (
    <div className='app'>
      {!user ? (
        <GoogleLogin />
      ) : (
        <>
          <Header />
          <div className='app__content'>
            <Sidebar />
            <ChatContainer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
