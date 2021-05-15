import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import './ChatInput.css';
import SendIcon from '@material-ui/icons/Send';
import db from '../db/firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase/app';
import { useParams } from 'react-router';

function ChatInput() {
  const [message, setMessage] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [{ user }] = useStateValue();
  const { roomId } = useParams();

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      db.collection('rooms').doc(roomId).collection('messages').add({
        user: user.email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setMessage('');
    }
  };

  return (
    <div className='chat-input__container'>
      <form
        className={`chat-input ${isFocus ? 'focused' : ''}`}
        onSubmit={(event) => sendMessage(event)}
      >
        <input
          type='text'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />

        <Button color='primary' type='submit'>
          <SendIcon />
        </Button>
      </form>
    </div>
  );
}

export default ChatInput;
