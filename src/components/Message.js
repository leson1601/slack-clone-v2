import React from 'react';
import './Message.css';
import { Avatar } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import db from '../db/firebase';
import { useStateValue } from '../StateProvider';

function Message({ author, timestamp, message, id, channelId }) {
  const [{ user }] = useStateValue();
  const deleteMessage = () => {
    console.log(id);
    console.log(channelId);
    db.collection('rooms')
      .doc(channelId)
      .collection('messages')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };
  console.log(author);
  console.log(user);

  return (
    <div className='message'>
      <Avatar alt={author.username} src={author.photo} />
      <div className='message-container'>
        <div className='message-info'>
          <h3 className='message-user'>{author.username}</h3>
          <h4 className='message-time'>
            {new Date(timestamp?.toDate()).toUTCString()}
          </h4>
        </div>
        <h3 className='message-content'>{message}</h3>
      </div>
      {user.email === author.email && (
        <HighlightOffIcon
          className='message-delete-btn'
          onClick={() => deleteMessage(id)}
        />
      )}
    </div>
  );
}

export default Message;
