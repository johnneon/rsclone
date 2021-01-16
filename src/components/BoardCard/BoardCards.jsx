import React from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';

import {
  AddCircle,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import BoardCreatePopup from '../BoardCreatePopup/BoardCreatePopup';
// import BoardCard from './BoardCard';

const useStyles = makeStyles({
  navColor: {
    color: '#3e3a3a',
    textDecoration: 'none',
  },
  cardItem: {
    display: 'block',
    width: 'calc(100% / 3 - 14px)',
    marginRight: '20px',
    marginBottom: '20px',
    textDecoration: 'none',
    border: 'none',
    backgroundColor: '#0000000a',
    '&:nth-child(3n)': {
      marginRight: '0',
    },
  },
  fullHeight: {
    height: '100%',
  },
  circleButton: {
    display: 'block',
    margin: '0 auto',
    width: '50px',
    height: '50px',
  },
});

const BoardCards = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* const cardsTemplates = Object.keys(testCards).map((item) => {
    const currentItem = testCards[item];
    return (
      <BoardCard
        title={currentItem.title}
        link={currentItem.link}
        image={currentItem.image}
      />
    );
  }); */

  return (
    <>
      <Card onClick={handleClickOpen} variant="outlined" className={classes.cardItem}>
        <CardActionArea className={classes.fullHeight}>
          <CardContent>
            <AddCircle color="action" className={classes.circleButton} />
          </CardContent>
        </CardActionArea>
      </Card>
      <BoardCreatePopup isOpen={open} close={handleClose} />
    </>
  );
};

export default BoardCards;
