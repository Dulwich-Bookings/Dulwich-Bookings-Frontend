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
      <Card className='bg-[#F3F3F4] rounded-[12px] w-[313px] h-[190px] hover:shadow-[0_4px_30px_0px_rgba(0,0,0,0.25)]'>
        <CardContent className='grow'>
          <Stack spacing={-2}>
            <div className='w-282px z-10'>
              <Bookmark onClick={isBookmarkHandler} className={`float-right text-[30px] text-[${isBookmark ? '#000000' : '#D9D9D9'}] `} />
            </div>
            <Stack spacing={0.5} className='z-0'>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                <Circle className={`text-[10px] text-[${props.vacancy ? '#76D674' : '#E25454'}]`} />
                <Typography gutterBottom variant='h5' component='h2' className='font-Inter'>
                  {props.roomName}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1.5} alignItems='center'>
                <PersonOutlineOutlined className='text-[20px] text-[#404040]' />
                <Stack spacing={-0.5}>
                  <Typography color='#404040' className='font-Inter'>
                    Access available to:
                  </Typography>
                  <Typography color='#404040' className='font-Inter'>
                    Insert available people
                  </Typography>
                </Stack>
              </Stack>
              <Grid container>
                {DUMMY_SUBJECTS.map(subject => (
                  <Grid item key={subject.name}>
                    <div className={`m-[5px] text-[white] text-[12px] rounded-[12px] px-[18px] bg-[${subject.color}]`}>
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
