import React, { useState } from 'react';
<<<<<<< HEAD
import { Stack, Grid } from '@mui/material';
=======
import { Stack } from '@mui/material';
>>>>>>> c5cbc85c384f7bf01df6bd3a411e893abefbedcf

import HomeHeader from '@/components/Home/HomeHeader/HomeHeader';
import HomeBanner from '@/components/Home/HomeBanner/HomeBanner';
import HomeRoomList from '@/components/Home/HomeRooms/HomeRoomList';
import HomeSearchBar from '@/components/Home/HomeSearchBar/HomeSearchBar';
import Footer from '@/components/Footer/Footer';
import Room from '@/models/room';
<<<<<<< HEAD
import HomeRoomHeader from '@/components/Home/HomeRooms/HomeRoomHeader';
=======
>>>>>>> c5cbc85c384f7bf01df6bd3a411e893abefbedcf

const DUMMY_ROOMS = [
  new Room('p1', 'COM1-01', true, false),
  new Room('p2', 'BIZ2-01', true, false),
  new Room('p3', 'COM2-06', false, false),
  new Room('p4', 'COM3-07', true, false),
];

const Home = () => {
  const [rooms, setRooms] = useState<Room[]>(DUMMY_ROOMS);

  const onInputChangeHandler = (enteredValue: string): void => {
    setRooms(DUMMY_ROOMS.filter(room => room.roomName.match(new RegExp(enteredValue, 'i'))));
  };

  return (
    <>
      <HomeHeader />
      <main>
<<<<<<< HEAD
        <Stack spacing={2}>
          <Stack spacing={-4}>
            <HomeBanner />
            <HomeSearchBar onInputChange={onInputChangeHandler} />
          </Stack>
          <Grid container alignItems='center' justifyContent='center'>
            <Stack direction='column' spacing={-6}>
              <HomeRoomHeader />
              <HomeRoomList rooms={rooms} />
            </Stack>
          </Grid>
        </Stack>
=======
        <Stack spacing={-4}>
          <HomeBanner />
          <HomeSearchBar onInputChange={onInputChangeHandler} />
        </Stack>
        <HomeRoomList rooms={rooms} />
>>>>>>> c5cbc85c384f7bf01df6bd3a411e893abefbedcf
      </main>
      {/* Footer */}
      <Footer />

      {/* End footer */}
    </>
  );
};

export default Home;
