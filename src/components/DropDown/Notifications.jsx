import React, {
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { NavLink } from 'react-router-dom';
import {
  Card,
  Button,
  Typography,
} from '@material-ui/core';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles(() => ({
  card: {
    padding: '5px',
    margin: '5px 0',
  },
  title: {
    paddingBottom: '10px',
  },
}));

const Notifications = ({ isOpen }) => {
  const classes = useStyles();
  const {
    discardNotifications,
    setNotification,
    token,
  } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const { enqueueSnackbar } = useSnackbar();
  const [nots, setNots] = useState([]);

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const getNots = async (tok, req) => {
    const requestOptions = {
      url: 'https://rsclone-back-end.herokuapp.com/api/auth/get_user',
      method: 'GET',
      headers: { Authorization: `Bearer ${tok}` },
    };

    const data = await req(requestOptions);

    setNots(data.notifications || []);
    localStorage.setItem('notifications', JSON.stringify({ notice: data.notifications }));
  };

  const comein = async (id, boardName) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/comein/${id}`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      };

      await request(requestOptions);

      await discardNotifications(id);
      getNots(token, request);
      showSnackbar(`Welcome to ${boardName}!`, 'success');
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  const ignore = async (id, boardName) => {
    try {
      const requestOptions = {
        url: `https://rsclone-back-end.herokuapp.com/api/board/ignore/${id}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      };

      await request(requestOptions);

      await discardNotifications(id);
      getNots(token, request);
      showSnackbar(`You left the board ${boardName}!`, 'success');
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    getNots(token, request);
  }, [isOpen, request, token, setNotification]);

  const notices = nots.map((item) => {
    const { from, boardName, boardId } = item;

    const agree = () => {
      comein(boardId, boardName);
    };

    const cancel = () => {
      ignore(boardId, boardName);
    };

    return (
      <Card
        className={classes.card}
        id={boardId}
        key={boardId}
      >
        <Typography
          variant="body1"
        >
          {`You have received an invitation to ${boardName} from ${from}`}
        </Typography>
        <Button
          component={NavLink}
          to="/boards"
          type="button"
          color="primary"
          onClick={agree}
          disabled={loading}
        >
          Agree
        </Button>
        <Button
          color="secondary"
          onClick={cancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </Card>
    );
  });

  return (
    <>
      {nots.length > 0
        ? notices
        : (
          <Typography
            variant="body1"
          >
            You have no notifications right now
          </Typography>
        )}
    </>
  );
};

export default Notifications;

Notifications.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
