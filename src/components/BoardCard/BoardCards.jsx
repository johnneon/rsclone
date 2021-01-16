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
import BoardCard from './BoardCard';

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

const testCards = [
  {
    title: 'Test 1',
    link: '/test',
    image: 'https://i.picsum.photos/id/378/200/200.jpg?hmac=p3D7bBkZrx1JzS7apkMa8wGrQ-IaD9aNykMbpZ0DHDU',
  },
  {
    title: 'Test 2',
    link: '/test2',
    image: 'https://i.picsum.photos/id/821/200/200.jpg?hmac=xmadfEZKXLrqLIgmvr2YTIFvhOms4m95Y-KXrpF_VhI',
  },
  {
    title: 'Test 3',
    link: '/test3',
    image: 'https://i.picsum.photos/id/789/200/200.jpg?hmac=7x3gF1b3I8Yu8nItiG1H2GYq6GcipkMPET8y2sqov5s',
  },
  {
    title: 'Test 4',
    link: '/test4',
    image: 'https://i.picsum.photos/id/43/200/200.jpg?hmac=gMoEYpdjrHoRnKoyIdtTknuqyCQDTC8exwLaKHpMv6E',
  },
];

const BoardCards = () => {
  const classes = useStyles();

  const cardsTemplates = Object.keys(testCards).map((item) => {
    const currentItem = testCards[item];
    return (
      <BoardCard
        title={currentItem.title}
        link={currentItem.link}
        image={currentItem.image}
      />
    );
  });

  return (
    <>
      {cardsTemplates}
      <Card variant="outlined" className={classes.cardItem}>
        <CardActionArea className={classes.fullHeight}>
          <CardContent>
            <AddCircle color="action" className={classes.circleButton} />
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default BoardCards;
