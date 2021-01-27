import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import {
  Grid,
  Paper,
  Button,
  Dialog,
  Typography,
  DialogContent,
  TextField,
} from '@material-ui/core';

import {
  Subtitles,
  Note,
  Close,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

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
      padding: '20px 15px',
    },
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
});

const CardPopup = ({
  idCard, isOpen,
}) => {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = { ...useStyles(), ...currentStyles() };
  const markDown = `${data.content ? data.content : ''}`;
  const [isEdit, setEdit] = useState(false);
  const [isEditName, setEditName] = useState(false);

  const [formData, setFormData] = useState({
    content: '',
    name: '',
  });

  const setFormDataHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const getCardData = async (id, tok, req) => {
    const requestOptions = {
      url: `https://rsclone-back-end.herokuapp.com/api/cards/${id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${tok}` },
    };

    const currentData = await req(requestOptions);
    setData(currentData);
  };

  const updateCard = async () => {
    const body = { ...formData };

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

  const changeEdit = ({ target }) => {
    const parent = target.parentNode;
    console.log(target);

    if (target.getAttribute('data-name') === 'name' || parent.getAttribute('data-name') === 'name') {
      setEditName(!isEditName);
      return;
    }

    setEdit(!isEdit);
  };

  const saveEdit = (e) => {
    changeEdit(e);
    const items = { ...data };

    Object.keys(formData).forEach((item) => {
      if (formData[item]) {
        items[item] = formData[item];
      }
    });

    setData(items);
    updateCard();
  };

  useEffect(() => {
    getCardData(idCard, token, request);
  }, [idCard, token, request]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const setTextField = () => {
    if (isEdit) {
      return (
        <>
          <i className={classes.helper}>Set text with markdown markup*</i>
          <TextField
            autoFocus
            multiline
            fullWidth
            className={`${classes.marginBottomSmall} ${classes.field}`}
            id="content"
            name="content"
            rows={10}
            defaultValue={data.content ? data.content : ''}
            onChange={setFormDataHandler}
          />
          <Button
            onClick={saveEdit}
            color="primary"
          >
            Save
          </Button>
        </>
      );
    }

    return (
      <Paper
        className={classes.paper}
        onClick={changeEdit}
        elevation={0}
      >
        <ReactMarkdown>
          {markDown}
        </ReactMarkdown>
      </Paper>
    );
  };

  const setNameField = () => {
    if (isEditName) {
      return (
        <>
          <TextField
            autoFocus
            multiline
            fullWidth
            className={classes.nameField}
            id="name"
            name="name"
            rows={1}
            defaultValue={data.name}
            onChange={setFormDataHandler}
          />
          <Button
            className={classes.buttonNameSave}
            data-name="name"
            onClick={saveEdit}
            color="primary"
          >
            Save
          </Button>
        </>
      );
    }

    return (
      <Typography
        className={classes.nameTitle}
        variant="h3"
        component="h2"
        data-name="name"
        onClick={changeEdit}
      >
        {data.name}
      </Typography>
    );
  };

  return (
    <Dialog
      className={`${classes.popupPadding} ${classes.popup}`}
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
    >
      <Close
        className={classes.closeButton}
        onClick={close}
      />
      <DialogContent>
        <Grid
          className={classes.marginBottomMiddle}
          container
          wrap="nowrap"
          direction="row"
          alignItems="center"
        >
          <Note className={classes.MarginRightSmall} />
          {setNameField()}
        </Grid>
        <Grid
          className={classes.marginBottomSmall}
          container
          direction="row"
          alignItems="center"
        >
          <Subtitles className={classes.MarginRightSmall} />
          <Typography
            variant="h3"
            component="h2"
          >
            Description
            {!isEdit ? (
              <Button
                className={classes.MarginLeftSmall}
                onClick={changeEdit}
                color="primary"
              >
                Edit
              </Button>
            ) : null}
          </Typography>
        </Grid>
        {setTextField()}
      </DialogContent>
    </Dialog>
  );
};

CardPopup.propTypes = {
  idCard: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default CardPopup;
