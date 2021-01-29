import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import AuthCard from '../components/AuthCard/AuthCard';
import vars from '../variables';

const useStyles = makeStyles((theme) => ({
  auth: {
    padding: '20px 30px',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: theme.palette.background.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    flexDirection: 'column',
  },
  auth__title: {
    marginBottom: '60px',
    textAlign: 'center',
  },
  authContainer: {
    width: '100%',
    maxWidth: '380px',
    minHeight: '400px',
  },
}));

const AuthPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.auth} maxWidth={false}>
      <Typography className={classes.auth__title} variant="h1">
        {`Welcome to ${vars.APP_NAME}`}
      </Typography>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <div className={classes.authContainer}>
          <AuthCard />
        </div>
      </SnackbarProvider>
    </Container>
  );
};

export default AuthPage;
