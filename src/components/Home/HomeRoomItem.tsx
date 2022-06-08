import React from 'react';

import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';

type RoomProps = {
  id: string;
  roomName: string;
  vacancy: boolean;
  bookmark: boolean;
};

const HomeRoomItem = (props: RoomProps) => {
  return (
    <Grid item key={props.id} xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 12 }}>
        <CardContent sx={{ flexGrow: 1 }}>
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
