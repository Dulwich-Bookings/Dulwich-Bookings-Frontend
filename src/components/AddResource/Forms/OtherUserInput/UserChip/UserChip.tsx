import React from 'react';

import { Grid, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { UserData } from '@/modules/user/types';

type Props = {
  userData: UserData;
  onDelete: () => void;
};

const UserChip = (props: Props) => {
  return (
    <Grid item key={props.userData.id}>
      <Chip
        className={`text-bgWhite text-sm font-inter px-2 rounded-[100px] h-[20px] bg-bgDarkGray`}
        size='small'
        label={props.userData.email}
        deleteIcon={<CloseIcon className='text-bgWhite text-[14px]' />}
        onDelete={props.onDelete}
      />
    </Grid>
  );
};

export default UserChip;
