import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  popup: {
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
      maxWidth: '500px',
    },
  },
});

const InviteUserPopap = ({ isOpen, close, createAction }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
  });

  const [formValidity, setFormValidity] = useState({
    email: true,
  });

  const setFormDataHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const checkFormValidity = () => {
    const { email } = formData;
    const isNameValid = !!email;

    setFormValidity({
      email: isNameValid,
    });

    return isNameValid;
  };

  const formActionHandler = (e) => {
    e.preventDefault();
    const isFormValid = checkFormValidity();

    if (!isFormValid) {
      return;
    }

    createAction(formData);

    close();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      className={classes.popup}
    >
      <form type="POST">
        <DialogTitle id="alert-dialog-slide-title">Invite user to your board:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            helperText={!formValidity.email ? 'Email is not valid.' : ' '}
            error={!formValidity.email}
            onChange={setFormDataHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={formActionHandler} color="primary">
            Invite
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

InviteUserPopap.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createAction: PropTypes.func.isRequired,
};

export default InviteUserPopap;
