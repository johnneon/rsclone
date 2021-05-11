import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import Aside from '../components/Aside/Aside';
import BoardCards from '../components/BoardCard/BoardCards';
import useStyles from '../hooks/style.hook';
import Footer from '../components/Footer/Footer';

const BoardPage = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={`${classes.paddingTopBig} ${classes.innerPage}`}>
        <Typography
          variant="h1"
          component="h1"
          className={classes.marginBottomSmall}
        >
          Board page
        </Typography>
        <Divider className={classes.marginBottomMiddle} />
        <Grid
          container
          direction="row"
          justify="space-between"
        >
          <Grid
            container
            item
            md={2}
            sm={3}
            xs={12}
          >
            <Aside />
          </Grid>
          <Grid
            container
            item
            md={10}
            sm={9}
            xs={12}
            className={classes.contentContainer}
          >
            <BoardCards />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default BoardPage;
