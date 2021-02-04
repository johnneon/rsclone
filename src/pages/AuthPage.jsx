import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthCard from '../components/AuthCard/AuthCard';
import Footer from '../components/Footer/Footer';
import vars from '../variables';

const useStyles = makeStyles((theme) => ({
  auth: {
    padding: '50px 30px',
    minHeight: 'calc(100vh - 124px);',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: '380px',
    minHeight: '400px',
  },
}));

const AuthPage = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.auth} maxWidth={false}>
        <Typography className={classes.auth__title} variant="h1">
          {`Welcome to ${vars.APP_NAME}`}
        </Typography>
        <div className={classes.authContainer}>
          <AuthCard />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default AuthPage;
