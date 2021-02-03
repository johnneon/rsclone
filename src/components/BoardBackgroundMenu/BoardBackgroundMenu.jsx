import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import BoardCreatePopupMenu from '../BoardCreatePopupMenu/BoardCreatePopupMenu';
import { BoardDataContext } from '../../context/BoardDataContext';

const useStyles = makeStyles(() => ({
  popover: {
    minWidth: '280px',
    maxHeight: '70vh',
    minHeight: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiPopover-paper': {
      width: 'max-content',
      minWidth: 'fit-content',
      overflowY: 'hidden',
      minHeight: '20px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#4f4e4ebf',
    },
  },
  buttons__wrapper: {
    padding: 5,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 3,
  },
}));

const BoardBackgroundMenu = ({
  isOpen, anchorEl, handleClose, request,
}) => {
  const classes = useStyles();

  const { updateBoardData } = useContext(BoardDataContext);

  const changeBackground = (background) => {
    updateBoardData.updateBoard({ background });
    request({ background });
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      className={classes.popover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <BoardCreatePopupMenu
        onClick={changeBackground}
        isOpen
      />
      <Box className={classes.buttons__wrapper}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
    </Popover>
  );
};

BoardBackgroundMenu.propTypes = {
  isOpen: PropTypes.bool,
  anchorEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.node }),
  ]),
  handleClose: PropTypes.func,
  request: PropTypes.func,
};

BoardBackgroundMenu.defaultProps = {
  isOpen: false,
  anchorEl: null,
  handleClose: null,
  request: null,
};

export default BoardBackgroundMenu;
