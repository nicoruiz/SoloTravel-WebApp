import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { palette } from './styles';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', color: palette.primary, p: 10 }}>
      <CircularProgress color="inherit" />
    </Box>
  );
}