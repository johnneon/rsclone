import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  menu: {
    zIndex: 1,
  },
}));

const BoardCardMenuList = ({ toggleMenuType, deleteCard }) => {
  const classes = useStyles();

  const handleClick = ({ target }) => {
    toggleMenuType(target.dataset.menu);
  };

  return (
    <MenuList>
      <MenuItem
        className={classes.card__menuItem}
        onClick={handleClick}
        data-menu="labels"
      >
        Change labels
      </MenuItem>
      <MenuItem
        className={classes.card__menuItem}
        onClick={deleteCard}
      >
        Delete
      </MenuItem>
    </MenuList>
  );
};

BoardCardMenuList.propTypes = {
  toggleMenuType: PropTypes.func,
  deleteCard: PropTypes.func,
};

BoardCardMenuList.defaultProps = {
  toggleMenuType: null,
  deleteCard: null,
};

export default BoardCardMenuList;
