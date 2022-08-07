import React from 'react';

import { Card, CardContent, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SubscriptionData } from '@/modules/subscription/types';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { textAreaToHTML } from '@/utilities/textAreaConversion';

type Props = {
  handleClose: () => void;
  data: SubscriptionData;
};

const SubscriptionModal = ({ data, handleClose }: Props) => {
  return (
    <Card className='bg-bgGray rounded-xl w-[355px] homeLaptop:w-[600px] h-96 hover:shadow-[0_4px_30px_0px_rgba(0,0,0,0.25)]'>
      <CardContent className='grow'>
        <div className='z-10'>
          <CloseIcon className='float-right text-3xl cursor-pointer' onClick={handleClose} sx={{ color: `#404040` }} />
        </div>
        <Stack spacing={1.5} className='m-10' alignItems='start'>
          <Stack>
            {data.link && (
              <a
                href={data.link}
                target='_blank'
                className='font-Inter text-dulwichRed text-[24px]  homeLaptop:text-[32px]'
                rel='noreferrer'
              >
                <Stack direction='row' className='items-center'>
                  {data.name}
                  <OpenInNewIcon />
                </Stack>
              </a>
            )}
            {!data.link && <div className='font-Inter text-dulwichRed text-3xl'>{data.name}</div>}
          </Stack>
          <div className='font-Inter text-sm text-bgBlack mt-0 w-[235px] homeLaptop:w-[480px] max-h-12 overflow-auto'>
            {data.description}
          </div>

          <Stack>
            <div className='font-Inter text-bgBlack text-[24px]'>Credentials</div>
            <div className='font-Inter text-bgBlack text-[20px] w-[235px] homeLaptop:w-[480px] max-h-32 overflow-auto'>
              {textAreaToHTML(data.credentials)}
            </div>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SubscriptionModal;
