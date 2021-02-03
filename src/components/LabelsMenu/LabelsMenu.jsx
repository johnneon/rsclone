/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import variables from '../../variables';
import LabelEditor from '../LabelEditor/LabelEditor';
import { BoardDataContext } from '../../context/BoardDataContext';

const useStyles = makeStyles(() => ({
  menu: {
    padding: 10,
  },
  header: {
    marginBottom: 5,
    padding: 5,
    position: 'relative',
  },
  back: {
    position: 'absolute',
    top: '50%',
    left: 5,
    transform: 'translate(0, -50%)',
  },
}));

const LabelsMenu = ({ onClick, cardId }) => {
  const { boardData } = useContext(BoardDataContext);
  const { labels } = boardData;
  const classes = useStyles();

  // console.log('boardData', boardData);

  return (
    <Box className={classes.menu}>
      <Box className={classes.header}>
        <IconButton
          className={classes.back}
          aria-label="return"
          onClick={null}
          size="small"
        >
          <ArrowBackIosIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="h4" align="center">
          Labels
        </Typography>
      </Box>
      <Divider />
      <Box>
        {labels.map((styles) => {
          return (
            <LabelEditor
              onClick={onClick}
              styles={styles}
              cardId={cardId}
              key={styles.color}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default LabelsMenu;
