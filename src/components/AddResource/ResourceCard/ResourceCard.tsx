import { Card, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

type Props = {
  cardName: string;
  type: number;
  onClickHandler?(): void;
};

const ResourceCard = (props: Props) => {
  const [cardUrl, setCardUrl] = useState<string>(`bg-[url(@/assets/images/Resource-Sample-1.jpg)]`);

  const setBG = () => {
    if (props.type === 2) {
      setCardUrl(`bg-[url(@/assets/images/Resource-Sample-2.png)]`);
    }

    if (props.type === 3) {
      setCardUrl(`bg-[url(@/assets/images/Resource-Sample-3.jpg)]`);
    }
  };

  useEffect(() => setBG(), []);

  return (
    <Grid item>
      <Card
        className={`${cardUrl} bg-cover bg-center w-[500px] h-[200px] lg:w-[380px] lg:h-full rounded-xl lg:mt-14 cursor-pointer
      hover:border`}
        onClick={props.onClickHandler}
      >
        <div className='flex w-full h-full justify-center items-center bg-bgBlur hover:bg-bgBlur/[.25]'>
          <div className='font-Inter text-[36px]'>{props.cardName}</div>
        </div>
      </Card>
    </Grid>
  );
};

export default ResourceCard;
