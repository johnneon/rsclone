import React, { useState, useContext, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';
import AuthForm from '../AuthForm/AuthForm';
import AuthFormTabs from '../AuthFormTabs/AuthFormTabs';

const useStyles = makeStyles((theme) => ({
  auth__form: {
    marginBottom: '50px',
    padding: '0 20px 20px',
    maxWidth: '380px',
    backgroundColor: theme.palette.background.main,
    borderRadius: '5px',
    boxShadow: `
      0 0 10px ${theme.palette.shadow.main}, 
      0 0 10px ${theme.palette.shadow.main}, 
      0 0 10px ${theme.palette.shadow.main}
    `,
  },
  backdrop: {
    zIndex: theme.zIndex.snackbar + 1,
    color: '#fff',
  },
}));

const AuthCard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { loading, request } = useHttp();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const auth = useContext(AuthContext);

  const changeActiveTabHandler = (event, tabIndex) => {
    setActiveTab(tabIndex);
  };

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const sendRegistrationRequest = async (data) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/auth/register',
        method: 'POST',
        body: { ...data },
        isAuthentication: true,
      };
      const response = await request(requestOptions);

      showSnackbar(response.message, 'success');
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const sendLoginRequest = async (data) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/auth/login',
        method: 'POST',
        body: { ...data },
        isAuthentication: true,
      };

      const {
        token,
        refreshToken,
        userId,
        fullName,
      } = await request(requestOptions);

      auth.login(token, refreshToken, userId, fullName);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  return (
    <>
      <Grid
        container
        className={classes.auth__form}
        direction="column"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item>
          <AuthFormTabs
            activeTab={activeTab}
            changeActiveTabHandler={changeActiveTabHandler}
          />
        </Grid>
        <Grid item>
          <AuthForm
            activeTab={activeTab}
            action={activeTab ? sendLoginRequest : sendRegistrationRequest}
          />
        </Grid>
      </Grid>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default AuthCard;
