import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          color: 'white',
          backgroundColor: '#05445E',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="sm">
          <p>&copy; { new Date().getFullYear() }, Solo Travel</p>
        </Container>
      </Box>
    </Box>
  );
}