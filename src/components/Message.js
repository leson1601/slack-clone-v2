import React from 'react';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import './Message.css';

function Message({ user, timestamp, message }) {
  return (
    <div className='message'>
      <PersonRoundedIcon />
      <div className='message-container'>
        <div className='message-info'>
          <h3 className='message-user'>{user}</h3>
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
