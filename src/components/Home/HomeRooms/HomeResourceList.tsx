import React from 'react';
import { Box, Grid } from '@mui/material';
import HomeRoomItem from './HomeResourceContainer';
import Room from '@/models/room';

type Props = {
  rooms: Room[];
};

const HomeRoomList = (props: Props) => {
  return (
    <Box sx={{ py: 8 }} maxWidth='md'>
      <Grid container spacing={4}>
        {props.rooms.map(room => (
          <HomeRoomItem key={room.id} id={room.id} roomName={room.roomName} vacancy={room.vacancy} bookmark={room.bookmark} />
        ))}
      </Grid>
    </Box>
  );
};

export default HomeRoomList;
