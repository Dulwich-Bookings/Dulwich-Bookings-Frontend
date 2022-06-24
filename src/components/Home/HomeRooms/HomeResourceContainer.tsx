import React from 'react';

import { Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';

type RoomProps = {
  id: string;
  roomName: string;
  vacancy: boolean;
  bookmark: boolean;
};

const HomeRoomItem = (props: RoomProps) => {
  return (
    <Grid className='w-screen' item key={props.id} xs={12} sm={6} md={4}>
      <Card className='bg-bgCard h-full flex flex-col rounded-[12px]'>
        <CardContent className='grow'>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.roomName}
          </Typography>
          <Typography>This is the room description.</Typography>
        </CardContent>
        <CardActions>
          {props.vacancy && (
            <Button variant='contained' color='success'>
              Book
            </Button>
          )}
          {!props.vacancy && (
            <Button variant='contained' disabled>
              Unavailable
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default HomeRoomItem;
