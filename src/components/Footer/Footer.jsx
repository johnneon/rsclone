import React from 'react';
import { Avatar, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from '../../hooks/style.hook';

const currentStyles = makeStyles((theme) => ({
  footer: {
    padding: '10px 0',
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.main,
    zIndex: 10,
  },
  footerLogo: {
    width: '100px',
    height: '30px',
  },
  footerLogoWrapper: {
    '@media(max-width: 480px)': {
      width: '100%',
      justifyContent: 'center',
    },
  },
  year: {
    color: theme.palette.background.main,
    fontSize: '18px',
    '@media(max-width: 480px)': {
      width: '100%',
      marginBottom: '20px',
      textAlign: 'center',
    },
  },
  avatar: {
    marginRight: '10px',
    '&:last-child': {
      marginRight: 0,
    },
  },
  avatars: {
    '@media(max-width: 480px)': {
      width: '100%',
      justifyContent: 'center',
      marginBottom: '20px',
    },
  },
}));

const devs = [
  {
    nick: 'johnneon',
    link: 'https://github.com/johnneon',
    image: 'assets/images/johnneon.jpg',
  },
  {
    nick: 'yrevtovich',
    link: 'https://github.com/yrevtovich',
    image: 'assets/images/yrevtovich.jpg',
  },
  {
    nick: 'nedvill',
    link: 'https://github.com/NedVill',
    image: 'assets/images/nedvill.jpg',
  },
];

function Footer() {
  const classes = { ...currentStyles(), ...useStyles() };

  const avatars = devs.map((item) => {
    const avatar = item;
    return (
      <a
        className={classes.avatar}
        key={avatar.nick}
        href={avatar.link}
        rel="noreferrer"
        target="_blank"
      >
        <Avatar alt={avatar.nick} src={avatar.image} />
      </a>
    );
  });

  return (
    <footer
      className={classes.footer}
    >
      <Container maxWidth={false}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <div className={`${classes.flex} ${classes.avatars}`}>
            {avatars}
          </div>
          <span className={classes.year}>RS Tasktracker, 2021</span>
          <div className={`${classes.flex} ${classes.alignItemCenter} ${classes.footerLogoWrapper}`}>
            <a href="https://rs.school/js/" rel="noreferrer" target="_blank">
              <img className={classes.footerLogo} src="assets/images/rs_school_js.svg" alt="rsschool" />
            </a>
          </div>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
