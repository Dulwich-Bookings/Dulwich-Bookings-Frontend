import React from 'react';

import { Grid, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { TagData } from '@/modules/tag/types';

type Props = {
  tagData: TagData;
  onDelete: () => void;
};

const TagChip = (props: Props) => {
  return (
    <Grid item className='px-2' key={props.tagData.id}>
      <Chip
        className={`text-bgWhite text-sm font-inter rounded-[100px] h-[20px] `}
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

export default TagChip;
