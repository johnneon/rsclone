import React, {
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import {
  Collapse,
  Typography,
} from '@material-ui/core';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';
import NotificationCard from './NotificationCard';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.card,
    color: theme.palette.text.main,
    position: 'absolute',
    right: '0',
    top: '100%',
    padding: '10px',
    width: '100%',
    maxWidth: '300px',
    borderRadius: '10px',
    boxShadow: '0 0 7px rgb(0, 0, 0, .5)',
  },
  card: {
    padding: '5px',
    margin: '5px 0',
  },
  title: {
    paddingBottom: '10px',
  },
}));

const DropDown = ({ isOpen }) => {
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
      <NotificationCard
        boardId={boardId}
        boardName={boardName}
        from={from}
        agree={agree}
        loading={loading}
        cancel={cancel}
      />
    );
  });

  return (
    <Collapse in={isOpen}>
      <div className={classes.container}>
        <Typography
          variant="h3"
          className={classes.title}
        >
          Notifications
        </Typography>
        {nots.length > 0
          ? notices
          : (
            <Typography
              variant="body1"
            >
              You have no notifications right now
            </Typography>
          )}
      </div>
    </Collapse>
  );
};

DropDown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default DropDown;
