import React from 'react';

import { Box, Card, CardContent, Grid, Modal, Stack } from '@mui/material';
import { SubscriptionData } from '@/modules/subscription/types';
import linkIcon from '@/assets/icons/link.png';

type Props = {
  data: SubscriptionData;
  isOpen: boolean;
  handleClose: () => void;
};

const SubscriptionModal = ({ data, isOpen, handleClose }: Props) => {
  return (
    <Modal className='backdrop-blur-sm' open={isOpen} onClose={handleClose}>
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Card className='bg-bgGray rounded-xl w-80 homeLaptop:w-[600px] h-96 hover:shadow-[0_4px_30px_0px_rgba(0,0,0,0.25)]'>
          <CardContent className='grow'>
            <Stack spacing={1.5} className='ml-10 m-3' alignItems='start'>
              <Stack>
                {data.link && (
                  <a href={data.link} className='font-Inter text-dulwichRed text-[32px]'>
                    <Grid container className=''>
                      <div>{data.name}</div>
                      <img className='object-scale-down' src={linkIcon} />
                    </Grid>
                  </a>
                )}
                {!data.link && <div className='font-Inter text-dulwichRed text-3xl'>{data.name}</div>}
              </Stack>
              <div className='font-Inter text-sm text-bgBlack mt-0'>{data.description}</div>

              <Stack>
                <div className='font-Inter text-bgBlack text-[24px]'>Credentials</div>
                <div className='font-Inter text-bgBlack text-[20px]'>{data.credentials}</div>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;
