import React from 'react';
import { Container, Grid } from '@mui/material';
import HomeRoomItem from './HomeRoomItem';

const DUMMY_ROOMS = [
  { id: 'p1', roomName: 'COM1-01', vacancy: true, bookmark: false },
  { id: 'p2', roomName: 'BIZ2-01', vacancy: true, bookmark: false },
  { id: 'p3', roomName: 'COM2-06', vacancy: false, bookmark: false },
  { id: 'p4', roomName: 'COM3-07', vacancy: true, bookmark: false },
];

const HomeRoomList = () => {
  return (
    <Container sx={{ py: 8 }} maxWidth='md'>
      <Grid container spacing={4}>
        {DUMMY_ROOMS.map(room => (
          <HomeRoomItem key={room.id} id={room.id} roomName={room.roomName} vacancy={room.vacancy} bookmark={room.bookmark} />
        ))}
      </Grid>
    </Container>
  );
};

export default HomeRoomList;
