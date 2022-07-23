import React from 'react';

import { Grid, Stack, Typography } from '@mui/material';
import BackButton from '@components/AddResource/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/system';
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
    <Grid container className='pl-0 justify-center mt-10 w-screen'>
      <Stack className='max-w-[1400px]'>
        <Box className='w-16' onClick={returnHomePage}>
          <BackButton buttonName='Home' />
        </Box>
        <Typography className='font-Inter text-[36px] mb-14 lg:mb-0'>Add Resource</Typography>
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
