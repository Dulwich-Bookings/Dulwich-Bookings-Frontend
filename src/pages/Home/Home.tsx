import React, { useState } from 'react';
import { Stack } from '@mui/material';

import HomeHeader from '@/components/Home/HomeHeader/HomeHeader';
import HomeBanner from '@/components/Home/HomeBanner/HomeBanner';
import HomeRoomList from '@/components/Home/HomeRooms/HomeRoomList';
import HomeSearchBar from '@/components/Home/HomeSearchBar/HomeSearchBar';
import Footer from '@/components/Footer/Footer';
import Room from '@/models/room';

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
        <Stack spacing={-4}>
          <HomeBanner />
          <HomeSearchBar onInputChange={onInputChangeHandler} />
        </Stack>
        <HomeRoomList rooms={rooms} />
      </main>
      {/* Footer */}
      <Footer />

      {/* End footer */}
    </>
  );
};

export default Home;
