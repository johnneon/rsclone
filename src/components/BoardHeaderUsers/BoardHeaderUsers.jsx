import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { useSnackbar } from 'notistack';
import InviteUserPopap from '../InviteUserPopap/InviteUserPopap';
import useHttp from '../../hooks/http.hook';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  boardHeader__element: {
    marginRight: '5px',
    padding: '3px 5px',
    width: 'fit-content',
    backgroundColor: theme.palette.buttons.transparentWhite,
    border: 'none',
  },
  boardHeader__usersList: {
    marginRight: '5px',
    '& .MuiAvatarGroup-avatar': {
      width: '25px',
      height: '25px',
      fontSize: 12,
      lineHeight: '1.1',
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  },
  boardHeader__users: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const BoardHeaderUsers = ({ data, boardId }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState(data);
  const [open, setOpen] = useState(false);
  const { token, email } = useContext(AuthContext);
  const { request } = useHttp();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inviteUser = async (to) => {
    try {
      const requestOptions = {
        url: 'https://rsclone-back-end.herokuapp.com/api/board/invite',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          to: to.email,
          from: email,
          boardId,
        },
      };

      const response = await request(requestOptions);

      if (response.message !== 'User will get invite!') {
        throw response;
      }

      showSnackbar(response.message, 'success');
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  };

  useEffect(() => setUsers(data), [data]);

  return (
    <Box className={classes.boardHeader__users}>
      <AvatarGroup
        max={5}
        spacing={4}
        className={classes.boardHeader__usersList}
      >
        {users.map((user) => {
          const { fullName, _id: id } = user;
          return (
            <Avatar className={classes.boardHeader__avatar} key={id}>
              {fullName[0]}
            </Avatar>
          );
        })}
      </AvatarGroup>
      <Button
        color="inherit"
        className={classes.boardHeader__element}
        onClick={handleClickOpen}
      >
        Invite
      </Button>
      <InviteUserPopap
        isOpen={open}
        close={handleClose}
        createAction={inviteUser}
      />
    </Box>
  );
};

BoardHeaderUsers.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ),
  boardId: PropTypes.string,
};

BoardHeaderUsers.defaultProps = {
  data: [],
  boardId: '',
};

export default BoardHeaderUsers;
