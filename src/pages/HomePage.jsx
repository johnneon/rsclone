import React, { useContext } from 'react';

import {
  Container,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import useStyles from '../hooks/style.hook';
import AuthContext from '../context/AuthContext';
import Footer from '../components/Footer/Footer';
import Aside from '../components/Aside/Aside';

const useCurrentStyles = makeStyles((theme) => ({
  welcome: {
    marginBottom: 17,
  },
  video: {
    width: 590,
    height: 332,
    [theme.breakpoints.down('lg')]: {
      width: 820,
      height: 460,
    },
    [theme.breakpoints.down('md')]: {
      width: 730,
      height: 408,
    },
    [theme.breakpoints.down('sm')]: {
      width: 390,
      height: 219,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      minWidth: '100%',
      minHeight: '50vw',
    },
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const currentClasses = useCurrentStyles();
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
            item
            md={2}
            sm={3}
            xs={12}
          >
            <Aside />
          </Grid>
          <Grid
            item
            md={10}
            sm={9}
            xs={12}
            className={classes.contentContainer}
          >
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                className={classes.contentContainer}
              >

                <Typography
                  variant="h1"
                  component="h2"
                  className={`${classes.marginBottomSmall} ${currentClasses.welcome}`}
                >
                  {`Welcome, ${fullName} !`}
                </Typography>
                <Divider />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <iframe
                  className={currentClasses.video}
                  src="https://www.youtube.com/embed/GeYg37AtWUc"
                  title="Video demonstration of the application"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
