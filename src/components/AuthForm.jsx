/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-unused-vars */
import {
  Box,
  Grid,
  TextField,
  Button,
  Container,
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useHttp from '../hooks/http.hook';
// import useStyles from '../hooks/style.hook';

const useStyles = makeStyles((theme) => ({
  auth__form: {
    padding: '0 10px 30px',
    maxWidth: '350px',
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
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const classes = useStyles();

  const {
    loading,
    request,
    error,
    clearErorr,
  } = useHttp();

  const auth = useContext(AuthContext);

  // const classes = useStyles();

  useEffect(() => {
    console.log(error); // Для обработки ошибок,
    clearErorr(); // так же можно без эфекта просто в блоки catch распихать
  }, [error, clearErorr]);

  const registerHandler = async () => {
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      className={classes.auth__form}
      direction="column"
      // justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <Tabs
          variant="fullWidth"
          value={value}
          indicatorColor="primary"
          textColor="inherit"
          onChange={handleChange}
          scrollButtons="off"
          // aria-label="disabled tabs example"
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
      {!value && (
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            size="small"
            variant="outlined"
            label="Name"
            type="text"
            name="fullName"
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
          type="password"
          name="password"
          helperText="Incorrect entry."
          error={false} /* -----------------   */
          onChange={changeHandler}
        />
      </Grid>
      <Grid item xs={5}>
        <Button
          variant="contained"
          onClick={!value ? registerHandler : loginHandler}
          disabled={loading}
          fullWidth
          color="primary"
        >
          {!value ? 'Sign Up' : 'Login'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
