import React from 'react';
import { Stack } from '@mui/material';

import HomeHeader from '@/components/Home/HomeHeader/HomeHeader';
import HomeBanner from '@/components/Home/HomeBanner/HomeBanner';
import HomeRoomList from '@/components/Home/HomeRooms/HomeRoomList';
import HomeSearchBar from '@/components/Home/HomeSearchBar/HomeSearchBar';
import Footer from '@/components/Footer/Footer';

const Home = () => {
  return (
    <>
      <HomeHeader />
      <main>
        <Stack spacing={-4}>
          <HomeBanner />
          <HomeSearchBar />
        </Stack>
        <HomeRoomList />
      </main>
      {/* Footer */}
      <Footer />

      {/* End footer */}
    </>
  );
};

export default Home;
