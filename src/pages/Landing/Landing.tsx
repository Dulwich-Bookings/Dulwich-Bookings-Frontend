import React from 'react';
import { Typography, Grid, TextField, Stack, Button } from '@mui/material';
import LandingImage from '@/assets/images/Landing-Sample.png';

const Landing = () => {
  return (
    <>
      <Grid container direction='row' className='h-screen'>
        <Grid item className='laptop:block hidden' xs={0} md={6}>
          <img className='object-none h-screen' width='100%' src={LandingImage} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container className='h-screen' direction='column' alignItems='center' justifyContent='center'>
            <Grid item className='w-9/12'>
              <Stack direction='column' spacing={8}>
                <Stack direction='column'>
                  <Typography variant='h2'>Welcome back</Typography>
                  <Typography variant='h6'>
                    Need to make an account?{' '}
                    <a className='text-dulwichRed underline underline-offset-4' href='#'>
                      Sign Up
                    </a>
                  </Typography>
                </Stack>
                <Stack direction='column' spacing={2}>
                  <Stack direction='column'>
                    <Typography variant='h6'>Email</Typography>
                    <TextField id='outlined-basic' label='name@dulwich.org' variant='outlined' />
                  </Stack>
                  <Stack direction='column'>
                    <Typography variant='h6'>Password</Typography>
                    <TextField type='password' id='outlined-basic' label='6+ characters, 1 special character' variant='outlined' />
                  </Stack>
                </Stack>
                <Stack direction='column' alignItems='center'>
                  <Button className='bg-dulwichRed normal-case w-32 h-11 text-lg' variant='contained'>
                    Sign In
                  </Button>
                  <Typography variant='h6'>
                    <a className='underline underline-offset-4 text-[#3D3D3D]' href='#'>
                      Forgot your password
                    </a>
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
