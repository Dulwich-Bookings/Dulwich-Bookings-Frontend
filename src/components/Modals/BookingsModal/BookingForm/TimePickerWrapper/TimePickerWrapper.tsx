import React, { useState, useEffect } from 'react';

import InputWithIcon from '@/components/Modals/BookingsModal/BookingForm/InputWithIcon/InputWithIcon';
import BookingTimePicker from '@/components/Modals/BookingsModal/BookingForm/TimePickerWrapper/BookingTimePicker/BookingTimePicker';
import { Typography, Stack, Input } from '@mui/material';
import { AccessTime } from '@mui/icons-material';

import moment from 'moment-timezone';
import { SchoolData } from '@/modules/school/types';

type Props = {
  startTime: Date;
  endTime: Date;
  editable: boolean;
  onChangeTime: (start: Date, isStart: boolean) => void;
  school: SchoolData;
  newBooking?: boolean;
};

const TimePickerWrapper = (props: Props) => {
  const [startTime, setStartTime] = useState<Date>(props.startTime);
  const [endTime, setEndTime] = useState<Date>(props.endTime);
  const [openStateStart, setOpenStateStart] = React.useState<boolean>(false);
  const [openStateEnd, setOpenStateEnd] = React.useState<boolean>(false);

  const handleOnCloseStart = async () => {
    setOpenStateStart(false);
  };

  const handleOnCloseEnd = async () => {
    setOpenStateEnd(false);
  };

  const handleOnChangeStart = (time: Date) => {
    setStartTime(time);
    props.onChangeTime(time, true);
  };
  const handleOnChangeEnd = (time: Date) => {
    setEndTime(time);
    props.onChangeTime(time, false);
  };

  useEffect(() => {
    props.onChangeTime(startTime, true), props.onChangeTime(endTime, false);
  }, []);

  return (
    <>
      <BookingTimePicker
        time={startTime}
        timezone={props.school.timezone}
        openState={openStateStart}
        handleOnClose={handleOnCloseStart}
        handleOnChange={handleOnChangeStart}
      />
      <BookingTimePicker
        time={endTime}
        timezone={props.school.timezone}
        openState={openStateEnd}
        handleOnClose={handleOnCloseEnd}
        handleOnChange={handleOnChangeEnd}
      />
      <InputWithIcon
        inputType='string'
        inputClassname='w-10/12 font-Inter'
        icon={<AccessTime className='ml-2' />}
        spacing={1.5}
        customInput={
          <Stack direction='column' spacing={-0.8}>
            <Typography className='font-Inter pt-2'>{moment(props.startTime).tz(props.school.timezone).format('dddd, MMMM D')}</Typography>
            <Stack direction='row' spacing={0.8}>
              <Input
                className='font-Inter font-light cursor-pointer text-[14px] w-10 '
                color='primary'
                value={moment(startTime).tz(props.school.timezone).format('HH:mm')}
                type='string'
                onClick={() => {
                  props.newBooking ? setOpenStateStart(true) : setOpenStateStart(false);
                }}
                id='standard-basic'
                disableUnderline
                readOnly
                disabled={props.newBooking ? false : true}
              />
              <Typography className='font-Inter text-[14px] pt-[3px]'>{'-'}</Typography>
              <Input
                className='font-Inter font-light cursor-pointer text-[14px]'
                color='primary'
                value={moment(endTime).tz(props.school.timezone).format('HH:mm')}
                type='string'
                onClick={() => {
                  props.newBooking ? setOpenStateEnd(true) : setOpenStateEnd(false);
                }}
                id='standard-basic'
                disableUnderline
                readOnly
                disabled={props.newBooking ? false : true}
              />
            </Stack>
          </Stack>
        }
      />
    </>
  );
};

export default TimePickerWrapper;
