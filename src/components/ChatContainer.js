import React from 'react';
import './ChatContainer.css';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

function ChatContainer() {
  return (
    <div className='main'>
      <div className='main-header'>
        <div className='main-header__left'>
          <div className='main-header__channel'>
            <h3>#allgemein</h3>
            <StarBorderRoundedIcon />
          </div>
          <h4>Add a topic</h4>
        </div>
        <div className='main-header__right'>
          <HelpOutlineIcon />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
