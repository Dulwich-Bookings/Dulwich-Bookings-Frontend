import React from 'react';
import { Container, Grid } from '@mui/material';
import HomeRoomItem from './HomeRoomItem';
import Room from '@/models/room';

type Props = {
  rooms: Room[];
};

const HomeRoomList = (props: Props) => {
  return (
    <Container sx={{ py: 8 }} maxWidth='md'>
      <Grid container spacing={4}>
        {props.rooms.map(room => (
          <HomeRoomItem key={room.id} id={room.id} roomName={room.roomName} vacancy={room.vacancy} bookmark={room.bookmark} />
        ))}
      </Grid>
    </Container>
  );
};

export default HomeRoomList;
