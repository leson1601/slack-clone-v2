import React from 'react';
import { useStateValue } from '../StateProvider';
import Modal from '@material-ui/core/Modal';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';

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

function SidebarLine({ Icon, title, id, subChannel }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [{ activeChannel }, dispatch] = useStateValue();
  const active = activeChannel && id === activeChannel;
  const className = `sidebar-line ${subChannel && 'sidebar-line--sub'} ${
    active && 'active'
  }`;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      className={className}
      onClick={() => {
        if (Icon === AddBoxIcon) {
          handleOpen();
        } else {
          dispatch({ type: 'SET_ACTIVE_CHANNEL', payload: id });
        }
      }}
    >
      {Icon && <Icon className='sidebar-line__icon' />}
      {!Icon && <h2 className='sidebar-line__hashtag'>#</h2>}
      <h3>{title}</h3>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id='simple-modal-title'>Create a channel</h2>
          <p id='simple-modal-description'>
            Channels are where your team communicates. They’re best when
            organized around a topic — #marketing, for example.
          </p>
          <form action='submit'>
            <label htmlFor='channel-name'>Name</label>
            <input type='text' id='channel-name' />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default SidebarLine;
