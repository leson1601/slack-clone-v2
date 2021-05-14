import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import { useStateValue } from '../StateProvider';
import { Avatar, DialogTitle } from '@material-ui/core';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './UserDetail.css';
import firebase from 'firebase/app';
import 'firebase/auth';

function SimpleDialog(props) {
  const { onClose, open } = props;
  const [{ user }, dispatch] = useStateValue();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('Signed out');
        dispatch({
          type: 'SET_USER',
          payload: null,
        });
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <DialogTitle id='simple-dialog-title'>User</DialogTitle>
      <Card className='user-detail'>
        <CardContent className='user-detail__header'>
          <Avatar alt={user.username} src={user.photo} />
          <div className='user-detail__body'>
            <h3 className='user-detail__username'>{user.username}</h3>
            <h3 className='user-detail__email'>{user.email}</h3>
          </div>
        </CardContent>

        <CardActions>
          <Button
            variant='contained'
            color='primary'
            startIcon={<ExitToAppIcon />}
            onClick={logout}
          >
            Log out
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [{ user }] = useStateValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Avatar alt={user.username} src={user.photo} onClick={handleClickOpen} />
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
