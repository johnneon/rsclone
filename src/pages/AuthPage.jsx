import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useHttp from '../hooks/http.hook';

const AuthPage = () => {
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

  useEffect(() => {
    console.log(error); // Для обработки ошибки регистрации / входа
    clearErorr();
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
    <Container>
      <h1>Auth page</h1>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Box bgcolor="green accent-4" color="secondary.contrastText" p={2}>
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
          </Box>
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
      </Grid>
    </Container>
  );
};

export default AuthPage;
