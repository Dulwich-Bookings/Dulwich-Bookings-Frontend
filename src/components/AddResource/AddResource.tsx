import React from 'react';

import { Grid, Stack, Typography } from '@mui/material';
import BackButton from '@components/AddResource/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import ResourceCard from './ResourceCard/ResourceCard';

const AddResource = () => {
  const history = useHistory();

  const returnHomePage = () => {
    history.push('/home');
  };

  const returnAddRoomPage = () => {
    history.push('/addResource/room');
  };

  return (
    <Grid container className='mt-10 justify-center px-10'>
      <Stack className='w-screen max-w-3xl lg:max-w-[1115px]'>
        <Grid container className='justify-start'>
          <Stack>
            <Grid item className='w-16' onClick={returnHomePage}>
              <BackButton buttonName='Home' />
            </Grid>
            <Typography className='font-Inter text-[36px] mb-14 lg:mb-0'>Add Resource</Typography>
          </Stack>
        </Grid>
        <Grid
          container
          className='lg:h-[621px]'
          spacing={3}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          <ResourceCard type={1} cardName='Room' onClickHandler={returnAddRoomPage} />
          <ResourceCard type={2} cardName='Tag' />
          <ResourceCard type={3} cardName='Subscription' />
        </Grid>
      </Stack>
    </Grid>
  );
};

export default AddResource;
{
  /* <img className='object-cover object-center w-screen h-72' src={resourceImages[1].img} /> */
}
