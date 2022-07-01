import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ResourceContainer from '@components/Home/HomeResources/HomeResourceContainer/HomeResourceContainer';
import Room from '@/models/room';

type Props = {
  rooms: Room[];
};

const HomeRoomList = (props: Props) => {
  const [isResourceEmpty, setIsResourceEmpty] = useState(false);
  useEffect(() => {
    if (props.rooms.length == 0) {
      setIsResourceEmpty(true);
    } else {
      setIsResourceEmpty(false);
    }

    console.log('Rooms Found');
  }, [props.rooms]);

  return (
    <Box className='py-20'>
      {!isResourceEmpty && (
        <Grid item container spacing={3.5}>
          {props.rooms.map(room => (
            <ResourceContainer key={room.id} id={room.id} roomName={room.roomName} vacancy={room.vacancy} bookmark={room.bookmark} />
          ))}
        </Grid>
      )}

      {isResourceEmpty && (
        <Typography className='font-Inter text-[#404040]' variant='h5' textTransform='capitalize'>
          No Resources Found.
        </Typography>
      )}
    </Box>
  );
};

export default HomeRoomList;
