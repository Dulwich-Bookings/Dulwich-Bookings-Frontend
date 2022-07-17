import React, { useEffect, useState, useRef } from 'react';
import { Modal, createTheme, Stack, ThemeProvider, Box, Input } from '@mui/material';
import { FormatAlignLeft, AccessTime, Close, CircleOutlined, RadioButtonCheckedOutlined } from '@mui/icons-material';
import BookingFormFooter from '../BookingFormFooter/BookingFormFooter';
import InputWithIcon from '../InputWithIcon/InputWithIcon';
import Checkbox from '@mui/material/Checkbox';
import BookingTimePicker from '../BookingTimePicker/BookingTimePicker';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

type Props = {
  openState: boolean;
  handleCloseModal: () => void;
  bookingTitle: string;
  bookingDescription: string;
  time: string;
  editable: string;
  start: string;
  end: string;
};

const BookingForm = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [time, setTime] = useState<string>(props.time);
  const [description, setDescription] = useState<string>(props.bookingDescription);
  const [multiline, setMultiline] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recurring, setRecurring] = useState<boolean>(false);
  const [timeModal, setTimeModal] = useState<boolean>(false);

  const handleOnBook = async () => {
    setIsLoading(true);
  };

  const handleOnSave = async () => {
    null;
  };

  const handleOnDelete = async () => {
    null;
  };

  const handleOnContact = async () => {
    null;
  };

  const handleTimeClick = async () => {
    setTimeModal(true);
  };

  const handleCloseTimePicker = async () => {
    setTimeModal(false);
  };
  const handleDescriptionClick = async () => {
    setMultiline(true);
    setRows(4);
  };

  const handleRecurringClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.editable == 'editable' || props.editable == 'new') {
      console.log(event.target.checked);
      setRecurring(event.target.checked);
    }
  };

  const handleTitleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.editable == 'editable' || props.editable == 'new') {
      console.log(event.target.value);
      setTitle(event.target.value);
    }
  };

  const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.editable == 'editable' || props.editable == 'new') {
      console.log(event.target.value);
      setDescription(event.target.value);
    }
  };

  useEffect(() => {
    setTime(props.time);
  }, [props.time]);

  useEffect(() => {
    setTitle(props.bookingTitle);
  }, [props.bookingTitle]);

  useEffect(() => {
    setDescription(props.bookingDescription);
  }, [props.bookingDescription]);

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMultiline(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener

      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [multiline]);

  return (
    <>
      <BookingTimePicker startTime={props.start} endTime={props.end} openState={timeModal} handleCloseModal={handleCloseTimePicker} />
      <ThemeProvider theme={theme}>
        <Modal className='flex justify-center items-center' open={props.openState} onClose={props.handleCloseModal}>
          <Box className='laptop:rounded-lg w-96 h-fit pl-5 pr-3 pt-2 pb-6 bg-bgWhite'>
            <Close onClick={props.handleCloseModal} fontSize='small' className='float-right cursor-pointer hover:text-grayAccent' />
            <Stack direction='column' className='h-full' spacing={{ xs: 2, md: 2 }} alignItems='justified'>
              <Input
                color='error'
                placeholder='Add title'
                value={title}
                className='w-full h-1/6 text-xxl ml-2 font-Inter'
                onChange={handleTitleChange}
              ></Input>
              <Stack direction='column' spacing={{ xs: 1, md: 1 }} alignItems='center'>
                <InputWithIcon
                  inputType='string'
                  inputValue={time}
                  inputClassname='w-10/12 font-Inter'
                  icon={<AccessTime className='ml-2' />}
                  spacing={2}
                  multiline={true}
                  rows={2}
                  acceptInput={false}
                  handleOnClick={handleTimeClick}
                />

                <div ref={ref} className='w-full'>
                  <InputWithIcon
                    inputType='string'
                    inputPlaceholder='Add description'
                    inputValue={description}
                    inputClassname='w-full color-bgWhite font-Inter font-light'
                    inputVariant='outlined'
                    multiline={multiline}
                    rows={rows}
                    icon={<FormatAlignLeft className='ml-2' />}
                    spacing={2}
                    handleOnClick={handleDescriptionClick}
                    inputHandleOnChange={handleDescriptionChange}
                    acceptInput={true}
                  />
                </div>
                <InputWithIcon
                  inputType='string'
                  inputValue={'Recurring Booking'}
                  inputClassname='w-6/12 font-Inter font-light'
                  icon={<Checkbox icon={<CircleOutlined />} checkedIcon={<RadioButtonCheckedOutlined />} onChange={handleRecurringClick} />}
                  spacing={1}
                  acceptInput={false}
                />
                <BookingFormFooter
                  type={props.editable}
                  handleOnBook={handleOnBook}
                  handleOnSave={handleOnSave}
                  handleOnDelete={handleOnDelete}
                  handleOnContact={handleOnContact}
                />
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default BookingForm;
