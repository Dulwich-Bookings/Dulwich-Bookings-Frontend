import React, { useState } from 'react';

import { Stack, Grid } from '@mui/material';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import HomeBanner from '@components/Home/HomeBanner/HomeBanner';
import HomeRoomList from '@components/Home/HomeRooms/HomeResourceList';
import HomeSearchBar from '@components/Home/HomeSearchBar/HomeSearchBar';
import Room from '@/models/room';

import HomeRoomHeader from '@components/Home/HomeRooms/HomeResourceHeader';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';

const DUMMY_ROOMS = [
  new Room('p1', 'COM1-01', true, false),
  new Room('p2', 'BIZ2-01', true, false),
  new Room('p3', 'COM2-06', false, false),
  new Room('p4', 'COM3-07', true, false),
];

const Home = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);
  const [rooms, setRooms] = useState<Room[]>(DUMMY_ROOMS);
  const [inputValue, setInputValue] = useState('');

  const onInputChangeHandler = (enteredValue: string): void => {
    setRooms(DUMMY_ROOMS.filter(room => room.roomName.match(new RegExp(enteredValue, 'i'))));
    setInputValue(enteredValue);
  };

  return (
    <>
      {currentUser && currentSchool && <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />}
      <main>
        <Stack spacing={3}>
          <Stack spacing={-4}>
            <HomeBanner schoolId={1} />
            <HomeSearchBar onInputChange={onInputChangeHandler} />
          </Stack>
          <Grid container className='justify-center'>
            <Stack spacing={-7} className='w-screen max-w-[1000px]'>
              <HomeRoomHeader input={inputValue} />
              <HomeRoomList rooms={rooms} />
            </Stack>
          </Grid>
        </Stack>
      </main>
    </>
  );
};

export default Home;
