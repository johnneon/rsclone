import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  popup: {
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
      maxWidth: '400px',
    },
  },
});

const BoardDeletePopup = ({
  isOpen, name, agree, close,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      className={classes.popup}
    >
      <DialogTitle
        id="alert-dialog-slide-title"
      >
        {`Are you sure to delete "${name}" ?`}
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={close}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={agree}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BoardDeletePopup.defaultProps = {
  name: 'Card',
};

BoardDeletePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string,
  agree: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default BoardDeletePopup;
