import React from 'react';
import './Message.css';
import { Avatar } from '@material-ui/core';

function Message({ user, timestamp, message }) {
  return (
    <div className='message'>
      <Avatar alt={user.username} src={user.photo} />
      <div className='message-container'>
        <div className='message-info'>
          <h3 className='message-user'>{user.username}</h3>
          <h4 className='message-time'>
            {new Date(timestamp?.toDate()).toUTCString()}
          </h4>
        </div>
        <h3 className='message-content'>{message}</h3>
      </div>
    </div>
  );
}

export default Message;
