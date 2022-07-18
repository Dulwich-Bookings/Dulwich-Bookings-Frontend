import React from 'react';

import { Grid, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { TagData } from '@/modules/tag/types';

type Props = {
  tagData: TagData;
  onDelete: () => void;
};

const AddRoomTag = (props: Props) => {
  return (
    <Grid item key={props.tagData.id}>
      <Chip
        className={`text-bgWhite text-sm font-inter px-2 rounded-[100px] h-[20px]`}
        size='small'
        style={{
          backgroundColor: `${props.tagData.colour}`,
        }}
        label={props.tagData.name}
        deleteIcon={<CloseIcon className='text-bgWhite text-[14px]' />}
        onDelete={props.onDelete}
      />
    </Grid>
  );
};

export default AddRoomTag;
