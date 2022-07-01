import React from 'react';

import { Stack, Grid } from '@mui/material';

import HomeRoomHeader from '@components/Home/HomeRooms/HomeRoomHeader/HomeResourceHeader';
import HomeRoomList from '@components/Home/HomeRooms/HomeRoomList/HomeResourceList';
import Room from '@/models/room';

type Props = {
  input: string;
  rooms: Room[];
};

const HomeRooms = (props: Props) => {
  return (
    <Grid container className='pl-10 md:justify-center md:pl-0'>
      <Stack spacing={-7} className='w-screen max-w-[1000px]'>
        <HomeRoomHeader input={props.input} />
        <HomeRoomList rooms={props.rooms} />
      </Stack>
    </Grid>
  );
};

export default HomeRooms;
