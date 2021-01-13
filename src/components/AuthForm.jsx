import {
  Grid,
  TextField,
  Button,
  Tabs,
  Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useHttp from '../hooks/http.hook';

const useStyles = makeStyles((theme) => ({
  auth__form: {
    padding: '0 20px 30px',
    maxWidth: '380px',
    borderRadius: '5px',
    boxShadow: `
      0 0 10px ${theme.palette.shadow.main}, 
      0 0 10px ${theme.palette.shadow.main}, 
      0 0 10px ${theme.palette.shadow.main}
    `,
  },
  auth__tabs: {
    maxWidth: '50%',
    minWidth: '40%',
  },
}));

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [fieldValidity, setFieldValidity] = useState({
    fullName: true,
    email: true,
    password: true,
  });

  const {
    loading,
    request,
    error,
    clearErorr,
  } = useHttp();

  const auth = useContext(AuthContext);

  const checkFieldValidation = ({ email, password, fullName }, isRegistration) => {
    switch (true) {
      case !fullName.match(/^[\w!#$%&'*+/=?^_`{|}~\-№"@]+$/) && isRegistration:
        setFieldValidity({ ...fieldValidity, fullName: false });
        return false;
      case !email.match(/^[\w!#$%&'*+/=?^_`{|}~]+(?:\.?[\w!#$%&'*+/=?^_`{|}~-]+)@[^.@]+\.[^.@]+$/):
        setFieldValidity({
          ...fieldValidity,
          fullName: true,
          email: false,
        });
        return false;
      case !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/):
        setFieldValidity({
          fullName: true,
          email: true,
          password: false,
        });
        return false;
      default:
        setFieldValidity({
          fullName: true,
          email: true,
          password: true,
        });
        return true;
    }
  };

  const changeActiveTabHandler = (event, tabIndex) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    console.log(error); // Для обработки ошибок,
    clearErorr(); // так же можно без эфекта просто в блоки catch распихать
  }, [error, clearErorr]);

  const registerHandler = async () => {
    const isValid = checkFieldValidation(form, !activeTab);

    if (!isValid) {
      return;
    }

    try {
      const formData = {
        url: 'https://rsclone-back-end.herokuapp.com/api/auth/register',
        method: 'POST',
        body: { ...form },
      };
      const data = await request(formData);
      console.log(data.message); // Для обработки ответа что юзер создан
    } catch (e) {
      clearErorr();
    }
  };

  const loginHandler = async () => {
    const isValid = checkFieldValidation(form, !activeTab);

    if (!isValid) {
      return;
    }

    try {
      const formData = {
        url: 'https://rsclone-back-end.herokuapp.com/api/auth/login',
        method: 'POST',
        body: { ...form },
      };
      const { token, userId } = await request(formData);
      auth.login(token, userId);
    } catch (e) {
      clearErorr();
    }
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.auth__form}
      direction="column"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <Tabs
          variant="fullWidth"
          value={activeTab}
          indicatorColor="primary"
          textColor="inherit"
          onChange={changeActiveTabHandler}
          scrollButtons="off"
        >
          <Tab
            label="Sing Up"
            className={classes.auth__tabs}
          />
          <Tab
            label="Login"
            className={classes.auth__tabs}
          />
        </Tabs>
      </Grid>
      {!activeTab && (
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            size="small"
            variant="outlined"
            label="Name"
            type="text"
            name="fullName"
            helperText={!fieldValidity.fullName ? 'Incorrect entry.' : ' '}
            error={!fieldValidity.fullName}
            onChange={changeHandler}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          size="small"
          variant="outlined"
          label="Email"
          type="email"
          name="email"
          helperText={!fieldValidity.email ? 'Incorrect entry.' : ' '}
          error={!fieldValidity.email}
          onChange={changeHandler}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          size="small"
          variant="outlined"
          label="Password"
          // type="password"
          name="password"
          helperText={!fieldValidity.password ? 'Incorrect entry.' : ' '}
          error={!fieldValidity.password}
          onChange={changeHandler}
        />
      </Grid>
      <Grid item xs={5}>
        <Button
          variant="contained"
          onClick={!activeTab ? registerHandler : loginHandler}
          disabled={loading}
          fullWidth
          color="primary"
        >
          {!activeTab ? 'Sign Up' : 'Login'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
