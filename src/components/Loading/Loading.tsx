import React from 'react';
import loadingGif from '@/assets/Loading.gif';
import { Stack } from '@mui/material';

const Loading = () => {
  return (
    <div className='w-full h-full bg-bgWhite flex justify-center'>
      <Stack>
        <img className='pt-10' src={loadingGif} />
        <p className='font-Inter italic'>Loading...</p>
      </Stack>
    </div>
  );
};

export default Loading;
