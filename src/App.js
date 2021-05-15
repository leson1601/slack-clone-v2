import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useStateValue } from './StateProvider';
import db from './db/firebase';
import ChatContainer from './components/ChatContainer';
import GoogleLogin from './components/GoogleLogin';
import firebase from 'firebase/app';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [{ user, users }, dispatch] = useStateValue();
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
    <Router>
      <div className='app'>
        {!user ? (
          <GoogleLogin />
        ) : (
          <div>
            <Header />
            <Switch>
              <div className='app__content'>
                <Sidebar />
                <Route path='/:roomId'>
                  <ChatContainer />
                </Route>
              </div>
            </Switch>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
