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
          <TextField
            autoFocus
            fullWidth
            className={classes.nameField}
            id={name}
            name={name}
            value={formData[name]}
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
        {formData[name] !== '' ? formData[name] : 'Enter name'}
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
        alignItems="flex-start"
      >
        <Note className={classes.MarginRightSmall} />
        {setField()}
      </Grid>
    </>
  );
};

CardPopupField.defaultProps = {
  name: '',
  value: '',
  action: () => {},
};

CardPopupField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  action: PropTypes.func,
};

export default CardPopupField;
