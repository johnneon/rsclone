import { Typography, Paper, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  auth__requirements: {
    width: 'calc(100% - 30px)',
    maxWidth: '800px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    outline: 'none',
    '& h2': {
      marginBottom: '15px',
    },
    '& h3': {
      marginBottom: '5px',
    },
    '& p': {
      marginBottom: '10px',
      textAlign: 'justify',
    },
  },
}));

const ValidationModal = ({ isOpen, close }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal
      open={open}
      onClose={close}
    >
      <Paper elevation={3} className={classes.auth__requirements}>
        <Typography variant="h2">
          Validation requirements
        </Typography>
        <Typography variant="h3">
          Login
        </Typography>
        <Typography variant="body2">
          Only latin alphabet, numbers and special symbols.
        </Typography>
        <Typography variant="h3">
          Email
        </Typography>
        <Typography variant="body2">
          It should contain only one &quot; @&quot; symbol, at
          least one latin letter
          number before &quot; @&quot;, only one &quot;.&quot; after &quot; @&quot;
          at least one latin letter or number after &quot; @&quot;
          and before &quot;.&quot;,  at least two symbols after &quot;.&quot;.
        </Typography>
        <Typography variant="h3">
          Password
        </Typography>
        <Typography variant="body2">
          It should contain at least 6 symbols, one uppercase latin symbol,
          1 lowercase latin symbol, 1 number.
        </Typography>
      </Paper>
    </Modal>
  );
};

ValidationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default ValidationModal;
