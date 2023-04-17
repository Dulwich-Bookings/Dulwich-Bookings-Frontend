import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import BackButton from '@/components/AddResource/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import { toggleShowNotification } from '@/modules/ui/uiSlice';
import { useDispatch } from 'react-redux';
import { severity } from '@/consts/constants';

type Props = {
  title: string;
  disableUpload: boolean;
};

const FormHeader = ({ title, disableUpload }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const returnResourcePage = () => {
    history.push('/addResource');
  };

  return (
    <Stack>
      <Stack direction='row' alignItems='center'>
        <Stack className='w-3/4' spacing={2}>
          <Box onClick={returnResourcePage}>
            <BackButton buttonText='Add Resource' />
          </Box>
          <Typography variant='h4' className='font-Inter'>
            {title}
          </Typography>
        </Stack>
        <div className='w-1/4'>
          {!disableUpload && (
            <Button
              onClick={() => {
                dispatch(toggleShowNotification({ message: 'This Feature Has Yet to be Implemented', severity: severity.INFO }));
              }}
              className='w-52 h-10 bg-[#808080] rounded-md text-bgWhite font-inter float-right'
            >
              Download Template
            </Button>
          )}
        </div>
      </Stack>
    </Stack>
  );
};

export default FormHeader;
