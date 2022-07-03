import React, { useState } from 'react';

import { Stack } from '@mui/material';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import HomeBanner from '@components/Home/HomeBanner/HomeBanner';
import HomeSearchBar from '@components/Home/HomeSearchBar/HomeSearchBar';
import Room from '@/models/room';
import HomeRooms from '@/components/Home/HomeResources/HomeResources';

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
          <HomeRooms searchedInput={inputValue} rooms={rooms} />
        </Stack>
      </main>
    </>
  );
};

export default Home;
