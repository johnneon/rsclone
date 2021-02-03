import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BoardCreatePopupMenu from '../BoardCreatePopupMenu/BoardCreatePopupMenu';
import BackgroundButton from '../BackroundButton/BackgroundButton';

const useStyles = makeStyles((theme) => ({
  popup: {
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
      maxWidth: '500px',
      alignSelf: 'flex-start',
      background: 'transparent',
      boxShadow: 'none',
      overflow: 'hidden',
    },
  },
  form: {
    marginBottom: 20,
  },
  content: {
    display: 'flex',
    padding: '0',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  wrapper: {
    minWidth: '55%',
  },
  name: {
    padding: '0 24px',
    minWidth: '50%',
    display: 'flex',
    overflowY: 'initial',
  },
}));

const BoardCreatePopup = ({ isOpen, close, createAction }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({ name: '', background: '#f44336' });
  const [formValidity, setFormValidity] = useState({ name: true });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClose = () => {
    setIsMenuOpen(() => false);
    setFormData(() => ({ ...formData, background: '#f44336' }));
    close();
  };

  const setFormDataHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const checkFormValidity = () => {
    const { name } = formData;
    const isNameValid = !!name;

    setFormValidity({ name: isNameValid });

    return isNameValid;
  };

  const formActionHandler = () => {
    const isFormValid = checkFormValidity();

    if (!isFormValid) {
      return;
    }

    createAction(formData);
    onClose();
  };

  const changeBackground = (background) => {
    setFormData({ ...formData, background });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        className={classes.popup}
        scroll="paper"
      >
        <Paper className={classes.form}>
          <Box className={classes.content}>
            <Box className={classes.wrapper}>
              <DialogTitle id="alert-dialog-slide-title">
                Create a new board
              </DialogTitle>
              <DialogContent className={classes.name}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="name"
                  label="Board name"
                  type="text"
                  fullWidth
                  size="small"
                  helperText={!formValidity.name ? 'Name is not valid.' : ' '}
                  error={!formValidity.name}
                  onChange={setFormDataHandler}
                />
              </DialogContent>
            </Box>
            <BackgroundButton
              openMenu={toggleMenu}
              color={formData.background}
            />
          </Box>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={formActionHandler} color="primary">
              Create
            </Button>
          </DialogActions>
        </Paper>
        <BoardCreatePopupMenu
          isOpen={isMenuOpen}
          onClick={changeBackground}
        />
      </Dialog>
    </>
  );
};

BoardCreatePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createAction: PropTypes.func.isRequired,
};

export default BoardCreatePopup;
