  
import React from 'react';

import classes from './Footer.module.css';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container>
        <p className={classes.footerText}>&copy; { new Date().getFullYear() }, Solo Travel</p>
      </Container>
    </footer>
  );
};

export default Footer;