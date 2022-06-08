import React from 'react';
import { Grid, Container } from '@mui/material';

import Header from '@/components/Home/HomeHeader';
import HeaderBackground from '@/components/Home/HomeHeaderBackground';
import HomeRoomList from '@/components/Home/HomeRoomList';
import HomeFooter from '@/components/Home/HomeFooter';

import SearchForm from '@/components/Home/SearchForm';
import HomeImage from '../../assets/landscapeImage.jpg';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero unit */}
        <HeaderBackground />
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            <HomeRoomList />
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <HomeFooter />
      {/* End footer */}
    </>
  );
};

export default Home;

/**
 *       <Grid container direction='column' spacing={2}>
        <Grid item xs={1} className='bg-dulwichRed' md={6}>
          <h1>xs=8</h1>
        </Grid>
        <Grid item xs={4} className='bg-orange' md={6}>
          <Button variant='outlined' className='bg-dulwichRed'>
            xs=4
          </Button>
        </Grid>
      </Grid>
 */
