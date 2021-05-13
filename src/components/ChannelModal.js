import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import db from '../db/firebase';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ChannelModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [channelName, setChannelName] = useState('');

  const addChannel = (name) => {
    db.collection('rooms')
      .add({ name: name })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Create a channel</h2>
      <p>
        Channels are where your team communicates. They’re best when organized
        around a topic — #marketing, for example.
      </p>
      <br></br>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={() => addChannel(channelName)}
      >
        <TextField
          id='outlined-basic'
          label='Name'
          variant='outlined'
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <Button
          onClick={() => addChannel(channelName)}
          variant='contained'
          color='primary'
        >
          Create
        </Button>
      </form>
    </div>
  );

  return (
    <div className='sidebar-line sidebar-line--sub'>
      <AddBoxIcon className='sidebar-line__icon' />
      <h3 type='button' onClick={handleOpen}>
        Add Channel
      </h3>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
}
