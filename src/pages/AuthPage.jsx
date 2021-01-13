import {
  Container,
  Typography,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import AuthForm from '../components/AuthForm';
import vars from '../variables';

const useStyles = makeStyles((theme) => ({
  auth: {
    padding: '20px 30px',
    minHeight: '100vh',
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
  auth__requirements: {
    padding: '20px',
    maxWidth: '800px',
    '& h2': {
      marginBottom: '15px',
    },
    '& h3': {
      marginBottom: '5px',
    },
    '& p': {
      marginBottom: '10px',
      textAlign: 'justify',
    },
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
        <Paper elevation={3} className={classes.auth__requirements}>
          <Typography variant="h2">
            Validation requirements
          </Typography>
          <Typography variant="h3">
            Login
          </Typography>
          <Typography variant="body2">
            Only latin alphabet, numbers and special symbols.
          </Typography>
          <Typography variant="h3">
            Email
          </Typography>
          <Typography variant="body2">
            It should contain only one &quot;@&quot; symbol, at least one latin letter or
            number before &quot;@&quot;, only one &quot;.&quot; after &quot;@&quot;,
            at least one latin letter or number after &quot;@&quot;
            and before &quot;.&quot;,  at least two symbols after &quot;.&quot;.
          </Typography>
          <Typography variant="h3">
            Password
          </Typography>
          <Typography variant="body2">
            It should contain at least 6 symbols, one uppercase latin symbol,
            1 lowercase latin symbol, 1 number.
          </Typography>
        </Paper>
      </Container>
    </SnackbarProvider>
  );
};

export default AuthPage;
