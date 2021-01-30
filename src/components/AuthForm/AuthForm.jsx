import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button } from '@material-ui/core';
import checkFieldValidity from '../../utils/checkFieldValidity';
import constants from '../../variables';

const AuthForm = ({ activeTab, action }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [formValidity, setFormValidity] = useState({
    fullName: true,
    email: true,
    password: true,
  });

  const setFormDataHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const checkFormValidity = () => {
    const { fullName, email, password } = formData;
    const { FULLNAME_REGEXP, EMAIL_REGEXP, PASSWORD_REGEXP } = constants;

    const isFullNameValid = !!activeTab || checkFieldValidity(fullName, FULLNAME_REGEXP);
    const isEmailValid = checkFieldValidity(email, EMAIL_REGEXP);
    const isPasswordValid = checkFieldValidity(password, PASSWORD_REGEXP);

    setFormValidity({
      fullName: isFullNameValid,
      email: isEmailValid,
      password: isPasswordValid,
    });

    return isPasswordValid && isEmailValid && isFullNameValid;
  };

  const formActionHandler = () => {
    const isFormValid = checkFormValidity();

    if (!isFormValid) {
      return;
    }

    action(formData);
  };

  const pressHandler = (event) => {
    if (event.key === 'Enter') {
      formActionHandler();
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      spacing={1}
    >
      {!activeTab && (
        <Grid item>
          <TextField
            required
            fullWidth
            size="small"
            variant="outlined"
            label="Name"
            type="text"
            name="fullName"
            helperText={!formValidity.fullName ? 'Name is not valid.' : ' '}
            error={!formValidity.fullName}
            onChange={setFormDataHandler}
            onKeyPress={pressHandler}
          />
        </Grid>
      )}
      <Grid item>
        <TextField
          required
          fullWidth
          size="small"
          variant="outlined"
          label="Email"
          type="email"
          name="email"
          helperText={!formValidity.email ? 'Email is not valid.' : ' '}
          error={!formValidity.email}
          onChange={setFormDataHandler}
          onKeyPress={pressHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          required
          fullWidth
          size="small"
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          helperText={!formValidity.password ? 'Password is not valid.' : ' '}
          error={!formValidity.password}
          onChange={setFormDataHandler}
          onKeyPress={pressHandler}
        />
      </Grid>
      <Grid item xs={6} sm={5}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={formActionHandler}
          onKeyPress={pressHandler}
        >
          {!activeTab ? 'Sign Up' : 'Login'}
        </Button>
      </Grid>
    </Grid>
  );
};

AuthForm.propTypes = {
  activeTab: PropTypes.number,
  action: PropTypes.func,
};

AuthForm.defaultProps = {
  activeTab: 0,
  action: () => {},
};

export default AuthForm;
