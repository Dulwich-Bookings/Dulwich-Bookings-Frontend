import * as React from 'react';
import { TextField, Stack, Modal, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Close } from '@mui/icons-material';

type Props = {
  openState: boolean;
  handleCloseModal: () => void;
  startTime: string;
  endTime: string;
};

const BookingTimePicker = (props: Props) => {
  const [start, setStart] = React.useState<string>(props.startTime);
  const [end, setEnd] = React.useState<string>(props.endTime);

  return (
    <Modal className='flex justify-center items-center' open={props.openState} onClose={props.handleCloseModal}>
      <Box className='laptop:w-1/4 laptop:h-fit laptop:m-2 laptop:rounded-lg w-full h-full pl-4 pr-1 pt-3 pb-6 bg-bgWhite'>
        <Close onClick={props.handleCloseModal} fontSize='small' className='float-right cursor-pointer hover:text-grayAccent' />
        <Stack direction='column' spacing={2}>
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label='Start Time'
                value={start}
                onChange={newValue => {
                  setStart(newValue as string);
                }}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label='End Time'
                value={end}
                onChange={newValue => {
                  setEnd(newValue as string);
                }}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
          </>
        </Stack>
      </Box>
    </Modal>
  );
};

export default BookingTimePicker;
