import React from 'react';
import { Stack, Typography, Grid, Box } from '@mui/material';

import SchoolLogoImage from '@/assets/dulwich_college.jpeg';

type Props = {
  name: string;
  alternativeName?: string;
};

const SchoolName = ({ name, alternativeName }: Props) => {
  return (
    <Grid container spacing={0} wrap='nowrap' alignItems='center'>
      <Grid item>
        <Box>
          <img className='h-16' src={SchoolLogoImage} />
        </Box>
      </Grid>
      <Grid item className='md:block hidden '>
        <Grid container>
          <Stack direction='column' spacing={0}>
            <Stack direction='row' spacing={1}>
              <Typography className='tracking-widest' variant='subtitle1' color='black' noWrap fontWeight='bold'>
                DULWICH COLLEGE
              </Typography>
              <Typography className='tracking-widest' variant='subtitle1' color='black' noWrap>
                | {name.toUpperCase()} |
              </Typography>
            </Stack>
            <Typography className='tracking-wider' variant='subtitle2' color='black' noWrap fontWeight='bold'>
              {alternativeName}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SchoolName;
