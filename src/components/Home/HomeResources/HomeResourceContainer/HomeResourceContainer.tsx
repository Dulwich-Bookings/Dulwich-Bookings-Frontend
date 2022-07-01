import React, { useState } from 'react';

import { Grid, Card, CardContent, Typography, Stack } from '@mui/material';

import { Bookmark, PersonOutlineOutlined, Circle } from '@mui/icons-material';

type RoomProps = {
  id: string;
  roomName: string;
  vacancy: boolean;
  bookmark: boolean;
};

const DUMMY_SUBJECTS = [
  { name: 'Technology', color: '#F7AD1D' },
  { name: 'Design', color: '#6AA5AD' },
  { name: 'DT', color: '#934EEA' },
  { name: 'CS', color: '#4E67EA' },
];

const HomeRoomItem = (props: RoomProps) => {
  const [isBookmark, setIsBookmark] = useState(false);

  const isBookmarkHandler = () => {
    setIsBookmark(!isBookmark);
  };

  return (
    <Grid item>
      <Card className='bg-bgGray rounded-xl w-80 h-48 hover:shadow-[0_4px_30px_0px_rgba(0,0,0,0.25)] cursor-pointer'>
        <CardContent className='grow'>
          <Stack spacing={-2}>
            <div className='w-72 z-10'>
              <Bookmark
                onClick={isBookmarkHandler}
                className='float-right text-3xl'
                sx={{ color: `${isBookmark ? '#000000' : '#D9D9D9'}` }}
              />
            </div>
            <Stack spacing={0.5} className='z-0'>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                <Circle className={`text-sm`} sx={{ color: `${props.vacancy ? '#76D674' : '#E25454'}` }} />
                <Typography gutterBottom variant='h5' component='h2' className='font-Inter'>
                  {props.roomName}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                <PersonOutlineOutlined className='text-xl text-bgNoHover' />
                <Stack spacing={-0.5}>
                  <Typography className='font-Inter text-bgNoHover'>Access available to:</Typography>
                  <Typography className='font-Inter text-bgNoHover'>Insert available people</Typography>
                </Stack>
              </Stack>
              <Grid container>
                {DUMMY_SUBJECTS.map(subject => (
                  <Grid item key={subject.name}>
                    <div className={`m-1 text-bgWhite text-sm rounded-xl px-4`} style={{ backgroundColor: subject.color }}>
                      <p className='font-Inter'>{subject.name}</p>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HomeRoomItem;
