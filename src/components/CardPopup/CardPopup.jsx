import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogContent,
} from '@material-ui/core';

import {
  Close,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

import CardPopupField from '../CardPopupField/CardPopupField';
import CardPopupTextField from '../CardPopupTextField/CardPopupTextField';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';
import useStyles from '../../hooks/style.hook';

const currentStyles = makeStyles({
  paper: {
    backgroundColor: '#f5f5f5',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    zIndex: '10',
    cursor: 'pointer',
  },
  popupPadding: {
    '& .MuiDialogContent-root': {
      padding: '40px 15px 20px ',
    },
  },
  dialogContent: {
    position: 'relative',
  },
  helper: {
    display: 'block',
    textAlign: 'right',
    fontSize: '12px',
  },
  field: {
    '& textarea': {
      lineHeight: '1.7',
    },
  },
  nameTitle: {
    cursor: 'pointer',
    wordBreak: 'break-word',
  },
  nameField: {
    width: 'calc(100% - 60px)',
    '& textarea': {
      lineHeight: '1.7',
    },
  },
  buttonNameSave: {
    position: 'absolute',
    right: '35px',
  },
  content: {
    wordBreak: 'break-word;',
  },
  done: {
    border: 'none',
    width: '30px',
    height: '30px',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
  },
});

const CardPopup = ({
  idCard, isOpen,
}) => {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = { ...useStyles(), ...currentStyles() };

  const getCardData = async (id, tok, req) => {
    const requestOptions = {
      url: `https://rsclone-back-end.herokuapp.com/api/cards/${id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${tok}` },
    };

    const currentData = await req(requestOptions);
    setData(currentData);
  };

  const updateCard = async (obj = {}) => {
    const body = { ...obj };

    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/cards/${idCard}`,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body,
      };
      await request(requestOptions);
    } catch (e) {
      console.log(e.message, 'error');
    }
  };

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    getCardData(idCard, token, request);
  }, [idCard, token, request]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Dialog
      className={`${classes.popupPadding} ${classes.popup}`}
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
    >
      <DialogContent className={classes.dialogContent}>
        <Close
          className={classes.closeButton}
          onClick={close}
        />
        <CardPopupField
          name="name"
          value={data.name}
          action={updateCard}
        />
        <CardPopupTextField
          name="content"
          value={data.content}
          title="Description"
          action={updateCard}
        />
      </DialogContent>
    </Dialog>
  );
};

CardPopup.propTypes = {
  idCard: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default CardPopup;
