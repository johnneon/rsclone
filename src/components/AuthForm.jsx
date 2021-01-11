import {
  Box,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useHttp from '../hooks/http.hook';
// import useStyles from '../hooks/style.hook';

const AuthForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });

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

  return (
    <Grid item xs={6}>
      <Grid container bgcolor="green accent-4" color="secondary.contrastText" p={2}>
        <TextField
          label="Standard"
          placeholder="Email"
          type="email"
          name="email"
          onChange={changeHandler}
        />
        <TextField
          label="Standard"
          placeholder="Full name"
          type="text"
          name="fullName"
          onChange={changeHandler}
        />
        <TextField
          label="Standard"
          placeholder="Password"
          type="password"
          name="password"
          onChange={changeHandler}
        />
      </Grid>
      <Box>
        <Button
          variant="contained"
          onClick={registerHandler}
          disabled={loading}
        >
          Singup
        </Button>
        <Button
          variant="contained"
          onClick={loginHandler}
          disabled={loading}
        >
          Login
        </Button>
      </Box>
    </Grid>
  );
};

export default AuthForm;
