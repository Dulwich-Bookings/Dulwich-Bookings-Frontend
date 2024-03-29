import React from 'react';

import { Grid } from '@mui/material';

import { TagData } from '@/modules/tag/types';

type Props = {
  tagData: TagData;
};

const ResourceTag = (props: Props) => {
  return (
    <Grid item key={props.tagData.id}>
      <div
        className={`m-1 text-bgWhite text-sm rounded-xl px-4 `}
        style={{
          backgroundColor: `${props.tagData.colour}`,
        }}
      >
        <p className='font-Inter'>{props.tagData.name}</p>
      </div>
    </Grid>
  );
};

export default ResourceTag;
