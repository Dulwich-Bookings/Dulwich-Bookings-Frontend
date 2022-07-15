import React from 'react';

import { Grid, Stack, Typography } from '@mui/material';
import BackButton from '@components/AddResource/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/system';

const AddResource = () => {
  const history = useHistory();

  const returnHomePage = () => {
    history.push('/home');
  };

  const returnAddRoomPage = () => {
    history.push('/addResource/room');
  };

  return (
    <Grid container className='pl-10 justify-center pl-0 mt-10'>
      <Stack className='w-screen max-w-[1432px]'>
        <Box onClick={returnHomePage}>
          <BackButton buttonName='Home' />
        </Box>
        <Typography className='font-Inter text-[36px]'>Add Resource</Typography>
        <Grid container className='h-[621px] '>
          <Grid
            item
            className="bg-[url('@/assets/images/Resource-Sample-1.jpg')] bg-cover bg-center mr-5 w-[424px] rounded-xl mt-14 cursor-pointer"
            onClick={returnAddRoomPage}
          >
            <div className='flex w-full h-full justify-center items-center bg-bgBlur'>
              <div className='font-Inter text-[36px]'>Room</div>
            </div>
          </Grid>
          <Grid
            item
            className="bg-[url('@/assets/images/Resource-Sample-2.png')] bg-cover bg-center mr-5 w-[424px] rounded-xl mt-14 cursor-not-allowed"
          >
            <div className='flex w-full h-full justify-center items-center bg-bgBlur'>
              <div className='font-Inter text-[36px]'>Tag</div>
            </div>
          </Grid>
          <Grid
            item
            className="bg-[url('@/assets/images/Resource-Sample-3.jpg')] bg-cover bg-center mr-5 w-[424px] rounded-xl mt-14 cursor-not-allowed"
          >
            <div className='flex w-full h-full justify-center items-center bg-bgBlur'>
              <div className='font-Inter text-[36px]'>Subscription</div>
            </div>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
};

export default AddResource;
{
  /* <img className='object-cover object-center w-screen h-72' src={resourceImages[1].img} /> */
}
