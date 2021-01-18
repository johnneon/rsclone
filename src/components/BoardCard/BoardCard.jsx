import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

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
    '&:nth-child(3n)': {
      marginRight: '0',
    },
  },
  media: {
    height: '200px',
    backgroundColor: '#f5f5f5',
  },
});

const BoardCard = ({ id, title, deleteBoard }) => {
  const classes = useStyles();

  const deleteThis = (e) => {
    e.preventDefault();
    deleteBoard(id);
  };

  return (
    <a onClick={deleteThis} className={classes.cardItem} href={`/card_${id}`}>
      <Card variant="outlined" className={classes.navAside}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            title
          />
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  );
};

BoardCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  deleteBoard: PropTypes.func.isRequired,
};

export default BoardCard;
