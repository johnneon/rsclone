import {
  Container,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import AuthForm from '../components/AuthForm';
import vars from '../variables';

const useStyles = makeStyles((theme) => ({
  auth: {
    padding: '32px',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    flexDirection: 'column',
  },
  auth__title: {
    marginBottom: '80px',
    textAlign: 'center',
  },
}));

const AuthPage = () => {
  const title = `Welcome to ${vars.APP_NAME}`;

  const classes = useStyles();

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Container className={classes.auth} maxWidth={false}>
        <Typography className={classes.auth__title} variant="h1">
          {title}
        </Typography>
        <AuthForm />
      </Container>
    </SnackbarProvider>
  );
};

export default AuthPage;
