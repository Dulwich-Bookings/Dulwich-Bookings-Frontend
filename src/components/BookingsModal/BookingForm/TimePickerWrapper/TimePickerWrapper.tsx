import InputWithIcon from '@/components/BookingsModal/BookingForm/InputWithIcon/InputWithIcon';
import React, { useState, useEffect } from 'react';
import { Typography, Stack, Input } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import BookingTimePicker from '@components/BookingsModal/BookingForm/TimePickerWrapper/BookingTimePicker/BookingTimePicker';
import moment from 'moment';

type Props = {
  startTime: string;
  endTime: string;
  editable: boolean;
  onChangeTime: (start: string, isStart: boolean) => void;
};

const TimePickerWrapper = (props: Props) => {
  const [startTime, setStartTime] = useState<string>(moment(props.startTime).format());
  const [endTime, setEndTime] = useState<string>(moment(props.endTime).format());
  const [openStateStart, setOpenStateStart] = React.useState<boolean>(false);
  const [openStateEnd, setOpenStateEnd] = React.useState<boolean>(false);

  const handleOnCloseStart = async () => {
    setOpenStateStart(false);
  };

  const handleOnCloseEnd = async () => {
    setOpenStateEnd(false);
  };

  const handleOnChangeStart = (time: string) => {
    setStartTime(moment(time).format());
    props.onChangeTime(moment(time).format(), true);
  };
  const handleOnChangeEnd = (time: string) => {
    setEndTime(moment(time).format());
    props.onChangeTime(time, false);
  };

  useEffect(() => {
    props.onChangeTime(startTime, true), props.onChangeTime(endTime, false);
  }, []);
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
            <Typography className='font-Inter pt-2'>{moment(props.startTime).format('dddd, MMMM D')}</Typography>
            <Stack direction='row' spacing={0.8}>
              <Input
                className='font-Inter font-light cursor-pointer text-[14px] w-10 '
                color='primary'
                value={moment(startTime).format('HH:mm')}
                type='string'
                onClick={() => {
                  props.editable ? setOpenStateStart(true) : setOpenStateStart(false);
                }}
                id='standard-basic'
                disableUnderline
                readOnly
              />
              <Typography className='font-Inter text-[14px] pt-[3px]'>{'-'}</Typography>
              <Input
                className='font-Inter font-light cursor-pointer text-[14px]'
                color='primary'
                value={moment(endTime).format('HH:mm')}
                type='string'
                onClick={() => {
                  props.editable ? setOpenStateStart(true) : setOpenStateStart(false);
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
