import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

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

const BoardHeaderUsers = ({ data }) => {
  const [users, setUsers] = useState(data);
  const classes = useStyles();

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
      >
        Invite
      </Button>
    </Box>
  );
};

BoardHeaderUsers.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ),
};

BoardHeaderUsers.defaultProps = {
  data: [],
};

export default BoardHeaderUsers;
