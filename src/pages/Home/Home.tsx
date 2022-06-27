import React, { useEffect, useState } from 'react';

import { Stack, Grid } from '@mui/material';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import HomeBanner from '@components/Home/HomeBanner/HomeBanner';
import HomeRoomList from '@components/Home/HomeRooms/HomeResourceList';
import HomeSearchBar from '@components/Home/HomeSearchBar/HomeSearchBar';
import Room from '@/models/room';

import HomeRoomHeader from '@components/Home/HomeRooms/HomeResourceHeader';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '@/modules/user/userSlice';
import { UserData } from '@/modules/user/types';

const DUMMY_ROOMS = [
  new Room('p1', 'COM1-01', true, false),
  new Room('p2', 'BIZ2-01', true, false),
  new Room('p3', 'COM2-06', false, false),
  new Room('p4', 'COM3-07', true, false),
];

const dummyUser: UserData = {
  id: 1,
  email: 'brian.quek@test',
  role: 'Admin',
  isTemporary: false,
  isConfirmed: true,
  schoolId: 1,
};

const Home = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState<Room[]>(DUMMY_ROOMS);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    dispatch(updateCurrentUser(dummyUser));
  }, [dispatch]);

  const onInputChangeHandler = (enteredValue: string): void => {
    setRooms(DUMMY_ROOMS.filter(room => room.roomName.match(new RegExp(enteredValue, 'i'))));
    setInputValue(enteredValue);
  };

  return (
    <>
      <HomeHeader />
      <main>
        <Stack spacing={3}>
          <Stack spacing={-4}>
            <HomeBanner />
            <HomeSearchBar onInputChange={onInputChangeHandler} />
          </Stack>
          <Grid className='justify-center' container>
            <Stack spacing={-7}>
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
