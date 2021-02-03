import React, { useContext } from 'react';

import {
  Container,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';

import useStyles from '../hooks/style.hook';
import AuthContext from '../context/AuthContext';
import Footer from '../components/Footer/Footer';
import Aside from '../components/Aside/Aside';

const HomePage = () => {
  const classes = useStyles();
  const { fullName } = useContext(AuthContext);

  return (
    <>
      <Container className={`${classes.paddingTopBig} ${classes.innerPage}`}>
        <Typography variant="h1" component="h1" className={classes.marginBottomSmall}>Home page</Typography>
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
            <Typography
              variant="h1"
              component="h2"
              className={classes.marginBottomSmall}
            >
              {`Welcome, ${fullName} !`}
            </Typography>
            <Divider />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
