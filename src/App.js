import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useStateValue } from './StateProvider';
import db from './db/firebase';

function App() {
  // const [state, dispatch] = useStateValue();
  const [{ channels }, dispatch] = useStateValue();
  useEffect(() => {
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
    if (channels) {
      dispatch({ type: 'SET_ACTIVE_CHANNEL', payload: channels[0]?.id });
    }
  }, [channels, dispatch]);

  return (
    <div className='app'>
      <Header />
      <div className='app__content'>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
