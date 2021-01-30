import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import {
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';

import {
  Subtitles,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import useStyles from '../../hooks/style.hook';

const currentStyles = makeStyles({
  paper: {
    backgroundColor: '#f5f5f5',
    padding: '10px 15px',
    cursor: 'pointer',
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
  content: {
    wordBreak: 'break-word;',
  },
});

const CardPopupTextField = ({
  name, value, title, action,
}) => {
  const classes = { ...useStyles(), ...currentStyles() };
  const [isEdit, setEdit] = useState(false);
  const [formData, setFormData] = useState({ [name]: '' });

  const setFormDataHandler = (event) => {
    setFormData({ [event.target.name]: event.target.value.trim() });
  };

  const changeEdit = () => {
    setEdit(!isEdit);
  };

  const saveEdit = () => {
    changeEdit();
    action({ [name]: formData[name] });
  };

  useEffect(() => {
    const val = value ? value.trim() : '';
    setFormData({ [name]: val });
  }, [name, value]);

  const setField = () => {
    if (isEdit) {
      return (
        <>
          <i className={classes.helper}>Set text with markdown markup*</i>
          <TextField
            autoFocus
            fullWidth
            multiline
            className={`${classes.marginBottomSmall} ${classes.field}`}
            id={name}
            name={name}
            defaultValue={formData[name]}
            onChange={setFormDataHandler}
            onBlur={saveEdit}
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
        <ReactMarkdown className={classes.content}>
          {formData[name] !== '' ? formData[name] : 'Click here to enter a content'}
        </ReactMarkdown>
      </Paper>
    );
  };

  return (
    <>
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
          {title}
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
      {setField()}
    </>
  );
};

CardPopupTextField.defaultProps = {
  name: '',
  value: '',
  title: 'Description',
  action: () => {},
};

CardPopupTextField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.func,
};

export default CardPopupTextField;
