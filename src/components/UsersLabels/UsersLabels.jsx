import React, {
  useState,
  useRef,
} from 'react';

import {
  AddCircle,
} from '@material-ui/icons';

import { Avatar, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from '../../hooks/style.hook';
import UsersLabelsList from '../UsersLabelsList/UsersLabelsList';

const currentStyles = makeStyles({
  avatars: {
    overflow: 'auto',
    width: 'calc(100% - 70px)',
  },
  avatar: {
    marginRight: '10px',
    '&:last-child': {
      marginRight: 0,
    },
  },
});

const UsersLabels = ({
  idCard, users, currentUsers,
}) => {
  const classes = { ...currentStyles(), ...useStyles() };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = useRef(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const getActiveIdxUsers = () => {
    const activesId = [];

    currentUsers.forEach((item) => {
      const avatar = item;

      users.forEach((userItem) => {
        if (avatar._id === userItem._id) {
          activesId.push(avatar._id);
        }

        return true;
      });
    });

    return activesId;
  };

  const renderAvatars = () => {
    if (currentUsers.length === 0) {
      return <i>No members</i>;
    }

    const avatars = currentUsers.map((item) => {
      const avatar = item;

      return (
        <Avatar
          key={item._id}
          className={classes.avatar}
          alt={avatar.fullName}
          src="#"
        />
      );
    });

    return (
      <>
        {avatars}
      </>
    );
  };

  const render = () => {
    const avatars = renderAvatars();
    return (
      <div className={`${classes.marginBottomMiddle} ${classes.flex} ${classes.alignItemCenter}`}>
        <div className={`${classes.avatars} ${classes.flex}`}>
          {avatars}
        </div>
        <Button
          className={classes.MarginLeftAuto}
          onClick={openMenu}
          ref={anchorRef}
        >
          <AddCircle />
        </Button>
        <UsersLabelsList
          idCard={idCard}
          users={users}
          usersIdx={getActiveIdxUsers()}
          open={isMenuOpen}
          handleClose={closeMenu}
          anchorEl={anchorRef.current}
        />
      </div>
    );
  };

  return (
    <>
      {render()}
    </>
  );
};

UsersLabels.propTypes = {
  idCard: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
  currentUsers: PropTypes.arrayOf(PropTypes.object),
};

UsersLabels.defaultProps = {
  idCard: '',
  users: [],
  currentUsers: [],
};

export default UsersLabels;
