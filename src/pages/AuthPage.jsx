import {
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import AuthForm from '../components/AuthForm';
import useStyles from '../hooks/style.hook';
import vars from '../variables';

const AuthPage = () => {
  const title = `Welcome to ${vars.APP_NAME}`;

  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.auth__title} variant="h1">
        {title}
      </Typography>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <AuthForm />
      </Grid>
    </Container>
  );
};

export default AuthPage;
