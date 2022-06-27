import React from 'react';
import { Stack, Typography, Grid, Box } from '@mui/material';

import SchoolLogoImage from '@/assets/dulwich_college.jpeg';

const SchoolName = () => {
  return (
    <Grid container spacing={0} wrap='nowrap' alignItems='center'>
      <Grid item>
        <Box>
          <img className='h-16' src={SchoolLogoImage} />
        </Box>
      </Grid>
      <Grid item>
        <Grid container>
          <Stack direction='column' spacing={0}>
            <Stack direction='row' spacing={1}>
              <Typography variant='subtitle1' color='black' noWrap fontWeight='bold'>
                DULWICH COLLEGE
              </Typography>
              <Typography variant='subtitle1' color='black' noWrap>
                | BEIJING |
              </Typography>
            </Stack>
            <Typography variant='subtitle2' color='black' noWrap fontWeight='bold'>
              北京德威英国国际学校
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SchoolName;
