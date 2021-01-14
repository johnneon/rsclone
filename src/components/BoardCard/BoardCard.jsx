import React from 'react';

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
  },
});

const BoardCard = (obj) => {
  const classes = useStyles();
  const cProps = { ...obj };

  return (
    <a className={classes.cardItem} href={cProps.link}>
      <Card variant="outlined" className={classes.navAside}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={cProps.image}
            title={cProps.title}
          />
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              {cProps.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  );
};

export default BoardCard;
