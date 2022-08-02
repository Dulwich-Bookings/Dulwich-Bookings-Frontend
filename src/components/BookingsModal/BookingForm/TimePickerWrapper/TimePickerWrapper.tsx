import InputWithIcon from '@/components/BookingsModal/BookingForm/InputWithIcon/InputWithIcon';
import React, { useState, useEffect } from 'react';
import { Typography, Stack, Input } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import BookingTimePicker from '@components/BookingsModal/BookingForm/TimePickerWrapper/BookingTimePicker/BookingTimePicker';
import moment from 'moment';

type Props = {
  bookingDate: string;
  startTime: string;
  endTime: string;
};

const TimePickerWrapper = (props: Props) => {
  const [startTime, setStartTime] = useState<string>(props.startTime);
  const [endTime, setEndTime] = useState<string>(props.endTime);
  const [openStateStart, setOpenStateStart] = React.useState<boolean>(false);
  const [openStateEnd, setOpenStateEnd] = React.useState<boolean>(false);

  const handleOnCloseStart = async () => {
    setOpenStateStart(false);
  };

  const handleOnCloseEnd = async () => {
    setOpenStateEnd(false);
  };

  const handleOnChangeStart = (time: string) => {
    setStartTime(moment(time).format('HH:mm'));
  };
  const handleOnChangeEnd = (time: string) => {
    setEndTime(moment(time).format('HH:mm'));
  };

  useEffect(() => setStartTime(startTime), [startTime]);

  useEffect(() => setEndTime(endTime), [endTime]);
  return (
    <>
      <BookingTimePicker
        time={startTime}
        openState={openStateStart}
        handleOnClose={handleOnCloseStart}
        handleOnChange={handleOnChangeStart}
      />
      <BookingTimePicker time={endTime} openState={openStateEnd} handleOnClose={handleOnCloseEnd} handleOnChange={handleOnChangeEnd} />
      <InputWithIcon
        inputType='string'
        inputClassname='w-10/12 font-Inter'
        icon={<AccessTime className='ml-2' />}
        spacing={1.5}
        customInput={
          <Stack direction='column' spacing={-0.8}>
            <Typography className='font-Inter pt-2'>{props.bookingDate}</Typography>
            <Stack direction='row' spacing={0.8}>
              <Input
                className='font-Inter font-light cursor-pointer text-[14px] w-10 '
                color='primary'
                value={startTime}
                type='string'
                onClick={() => {
                  setOpenStateStart(true);
                }}
                id='standard-basic'
                disableUnderline
                readOnly
              />
              <Typography className='font-Inter text-[14px] pt-[3px]'>{'-'}</Typography>
              <Input
                className='font-Inter font-light cursor-pointer text-[14px]'
                color='primary'
                value={endTime}
                type='string'
                onClick={() => {
                  setOpenStateEnd(true);
                }}
                id='standard-basic'
                disableUnderline
                readOnly
              />
            </Stack>
          </Stack>
        }
      />
    </>
  );
};

export default TimePickerWrapper;
