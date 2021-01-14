import React from 'react';
import BoardCard from './BoardCard';

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
    </>
  );
};

export default BoardCards;
