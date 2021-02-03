/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import LabelsMenu from '../LabelsMenu/LabelsMenu';

const useStyles = makeStyles(() => ({
  menu: {
    zIndex: 1,
  },
}));

const BoardCardMenu = ({
  open, handleClose, anchorEl, deleteCard, cardId,
}) => {
  const [opened, setOpen] = useState('');
  const classes = useStyles();

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      transition
      placement="right-start"
      className={classes.menu}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          in={TransitionProps.in}
          onEnter={TransitionProps.onEnter}
          onExited={TransitionProps.onExited}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper className={classes.card__menu}>
            <ClickAwayListener onClickAway={handleClose}>
              <Box>
                {opened === 'menu'
                  ? (
                    <MenuList autoFocusItem={open}>
                      <MenuItem
                        className={classes.card__menuItem}
                        onClick={handleClose}
                      >
                        Edit members
                      </MenuItem>
                      <MenuItem
                        className={classes.card__menuItem}
                        onClick={handleClose}
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
                  ) : (
                    <LabelsMenu onClick={null} cardId={cardId} />
                  )}
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

BoardCardMenu.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.node }),
  ]),
  deleteCard: PropTypes.func,
  cardId: PropTypes.string,
};

BoardCardMenu.defaultProps = {
  open: false,
  handleClose: () => {},
  anchorEl: null,
  deleteCard: () => {},
  cardId: '',
};

export default BoardCardMenu;
