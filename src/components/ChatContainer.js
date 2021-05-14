import React, { useEffect, useState } from 'react';
import './ChatContainer.css';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Message from './Message';
import db from '../db/firebase';
import { useStateValue } from '../StateProvider';
import ChatInput from './ChatInput';

function ChatContainer() {
  const [{ activeChannel }] = useStateValue();
  const [roomMessages, setRoomMessages] = useState([]);
  const [channel, setChannel] = useState('');

  useEffect(() => {
    if (activeChannel) {
      db.collection('rooms')
        .doc(activeChannel)
        .onSnapshot((doc) => {
          setChannel(doc.data().name);
        });

      db.collection('rooms')
        .doc(activeChannel)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setRoomMessages(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          )
        );
    }
  }, [activeChannel]);
  return (
    <div className='main'>
      <div className='main-header'>
        <div className='main-header__left'>
          <div className='main-header__channel'>
            <h3>#{channel}</h3>
            <StarBorderRoundedIcon />
          </div>
          <h4>Add a topic</h4>
        </div>
        <div className='main-header__right'>
          <HelpOutlineIcon />
        </div>
      </div>
      <div className='main-body'>
        {roomMessages.map(({ message, timestamp, user }) => (
          <Message message={message} timestamp={timestamp} user={user} />
        ))}

        <ChatInput />
      </div>
    </div>
  );
}

export default ChatContainer;
