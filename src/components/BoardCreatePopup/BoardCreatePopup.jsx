/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  List,
  ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BoardCreatePopupMenu from '../BoardCardCreatePopupMenu/BoardCardCreatePopupMenu';
import BackgroundButton from '../BackroundButton/BackgroundButton';

const useStyles = makeStyles({
  popup: {
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
      maxWidth: '500px',
      alignSelf: 'flex-start',
    },
  },
  content: {
    padding: '0 24px',
    minWidth: '50%',
    display: 'flex',
    overflowY: 'initial',
  },
});

const BoardCreatePopup = ({ isOpen, close, createAction }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({ name: '' });
  const [formValidity, setFormValidity] = useState({ name: true });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const popupRef = useRef(null);

  const setFormDataHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const checkFormValidity = () => {
    const { name } = formData;
    const isNameValid = !!name;

    setFormValidity({ name: isNameValid });

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

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(isMenuOpen, popupRef.current);

  return (
    <>
      <Dialog
        // open={isOpen}
        open
        onClose={close}
        aria-labelledby="alert-dialog-title"
        className={classes.popup}
        scroll="paper"
        PaperProps={{ ref: popupRef }}
        // ref={popupRef}
      >
        {/* <form type="POST"> */}
        <Box style={{ display: 'flex', padding: '0' }}>
          <Box style={{ width: '55%' }}>
            <DialogTitle id="alert-dialog-slide-title">
              Create a new board
            </DialogTitle>
            <DialogContent className={classes.content}>
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
          />        
        </Box>
          <DialogActions>
            <Button onClick={close} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={formActionHandler} color="primary">
              Create
            </Button>
          </DialogActions>
        {/* </form> */}
      </Dialog>
      <BoardCreatePopupMenu 
        handleClose={toggleMenu}
        handleClick
        anchorEl={popupRef.current}
        isOpen={isMenuOpen}
      />
    </>
  );
};

BoardCreatePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  createAction: PropTypes.func.isRequired,
};

export default BoardCreatePopup;
