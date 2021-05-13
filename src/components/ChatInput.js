import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import './ChatInput.css';
import SendIcon from '@material-ui/icons/Send';
import db from '../db/firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase/app';

function ChatInput() {
  const [message, setMessage] = useState('');
  const [{ activeChannel }] = useStateValue();
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      console.log(message);
      db.collection('rooms').doc(activeChannel).collection('messages').add({
        user: 'Son Le',
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };
  return (
    <form className='chat-input' onSubmit={(event) => sendMessage(event)}>
      <input
        type='text'
        placeholder='Send a message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button color='primary' type='submit'>
        <SendIcon />
      </Button>
    </form>
  );
}

export default ChatInput;
