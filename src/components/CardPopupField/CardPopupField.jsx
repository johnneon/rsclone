import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';

import {
  Done,
  Note,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import useStyles from '../../hooks/style.hook';

const currentStyles = makeStyles({
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
  done: {
    border: 'none',
    width: '30px',
    height: '30px',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
  },
});

const CardPopupField = ({
  name, value, action,
}) => {
  const classes = { ...useStyles(), ...currentStyles() };
  const [isEdit, setEdit] = useState(false);
  const [val, setValue] = useState('');
  const [formData, setFormData] = useState({}[name] = '');

  const setFormDataHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const changeEdit = () => {
    setEdit(!isEdit);
  };

  const saveEdit = () => {
    changeEdit();

    const data = {};
    data[name] = formData[name];

    action(data);
    setValue(formData[name]);
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  const setField = () => {
    if (isEdit) {
      return (
        <>
          <TextField
            autoFocus
            fullWidth
            className={classes.nameField}
            id={name}
            name={name}
            defaultValue={val}
            onChange={setFormDataHandler}
            onBlur={saveEdit}
          />
          <button
            type="button"
            onClick={saveEdit}
            className={classes.done}
          >
            <Done color="primary" />
          </button>
        </>
      );
    }

    return (
      <Typography
        className={classes.nameTitle}
        variant="h3"
        component="h2"
        onClick={changeEdit}
      >
        {val !== '' ? val : 'Enter name'}
      </Typography>
    );
  };

  return (
    <>
      <Grid
        className={classes.marginBottomMiddle}
        container
        wrap="nowrap"
        direction="row"
        alignItems="start"
      >
        <Note className={classes.MarginRightSmall} />
        {setField()}
      </Grid>
    </>
  );
};

CardPopupField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default CardPopupField;
