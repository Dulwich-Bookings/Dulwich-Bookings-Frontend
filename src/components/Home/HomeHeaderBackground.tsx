import React from 'react';
import { Box, Container } from '@mui/material';

import SearchForm from './SearchForm';
import HomeBackground from '../../assets/landscapeImage.jpg';

const HomeHeaderBackground = () => {
  return (
    <Box
      sx={{
        pt: 16,
        pb: 12,
        backgroundImage: `url(${HomeBackground})`,
      }}
      className='flex items-end'
    >
      <Container maxWidth='sm'>
        <SearchForm />
      </Container>
    </Box>
  );
};

export default HomeHeaderBackground;
