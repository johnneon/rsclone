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
import useHttp from '../../hooks/http.hook';

const useStyles = makeStyles({
  popup: {
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
      maxWidth: '500px',
    },
  },
});

const BoardCreatePopup = ({ isOpen, close }) => {
  const classes = useStyles();
  const { request } = useHttp();

  const [formData, setFormData] = useState({
    name: '',
  });

  const [formValidity, setFormValidity] = useState({
    name: true,
  });

  const setFormDataHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const createNewBoard = async (data) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/board/',
        method: 'POST',
        header: { Authorization: 'Bearer TOKEN' },
        body: { ...data },
      };

      const datas = await request(requestOptions);
      console.log(datas);
    } catch (e) {
      console.log(e.message, 'error');
    }
  };

  const checkFormValidity = () => {
    const { name } = formData;
    const isNameValid = !!name;

    setFormValidity({
      name: isNameValid,
    });

    return isNameValid;
  };

  const formActionHandler = (e) => {
    e.preventDefault();
    const isFormValid = checkFormValidity();

    if (!isFormValid) {
      return;
    }

    createNewBoard(formData);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      className={classes.popup}
    >
      <form type="POST">
        <DialogTitle id="alert-dialog-slide-title">Create a new board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Board name"
            type="text"
            fullWidth
            helperText={!formValidity.name ? 'Name is not valid.' : ' '}
            error={!formValidity.name}
            onChange={setFormDataHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={formActionHandler} color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

BoardCreatePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default BoardCreatePopup;
