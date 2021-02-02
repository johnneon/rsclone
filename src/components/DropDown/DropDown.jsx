import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles(() => ({
  div: {
    background: '#000',
    position: 'absolute',
    right: '0',
    bottom: '0',
  },
}));

const DropDown = ({ isOpen }) => {
  const classes = useStyles();
  const { getNotifications } = useContext(AuthContext);
  const notifications = getNotifications();

  const notices = notifications.map((item) => {
    const { from, board } = item;

    if (typeof item === 'object') {
      return (
        <Box key={board}>
          You have got invite to
          {board}
          from
          {from}
        </Box>
      );
    }

    return null;
  });

  const modal = (
    <Box className={classes.div}>
      {notices}
    </Box>
  );
  return isOpen ? modal : null;
};

export default DropDown;
