import React, { useEffect, useState } from 'react';
import { Modal, createTheme, Stack, ThemeProvider, Box, Input } from '@mui/material';
import { FormatAlignLeft, PeopleAltOutlined, AccessTime, Close } from '@mui/icons-material';
import BookingButton from '../BookingButton/BookingButton';
import InputWithIcon from '../InputWithIcon/InputWithIcon';

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
  bookingAddOthers: string;
  time: string;
};

const BookingForm = (props: Props) => {
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [addOthers, setAddOthers] = useState<string>('');
  const [multiline, setMultiline] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);

  const handleBook = async () => {
    setIsLoading(true);
  };

  const handleOnClick = async () => {
    setMultiline(true);
    setRows(4);
  };

  useEffect(() => {
    setTitle(props.bookingTitle);
  }, [props.bookingTitle]);

  useEffect(() => {
    setDescription(props.bookingDescription);
  }, [props.bookingDescription]);

  useEffect(() => {
    setAddOthers(props.bookingAddOthers);
  }, [props.bookingAddOthers]);

  return (
    <ThemeProvider theme={theme}>
      <Modal className='flex justify-center items-center' open={props.openState} onClose={props.handleCloseModal}>
        <Box className='laptop:w-1/4 laptop:h-fit laptop:m-2 laptop:rounded-lg w-full h-full pl-4 pr-1 pt-3 pb-6 bg-white'>
          <Close onClick={props.handleCloseModal} fontSize='small' className='float-right cursor-pointer hover:text-grayAccent' />
          <Stack direction='column' className='h-full' spacing={{ xs: 2, md: 2 }} alignItems='justified'>
            <Input
              placeholder='Add title'
              value={title}
              color='error'
              className='w-full h-1/6 text-xxl color-red'
              onChange={input => setTitle(input.target.value)}
            ></Input>
            <Stack direction='column' spacing={{ xs: 2, md: 2 }} alignItems='center'>
              <InputWithIcon
                inputType='string'
                inputValue={props.time}
                inputClassname='w-10/12'
                icon={<AccessTime />}
                spacing={2}
                multiline={true}
                rows={2}
              />
              <InputWithIcon
                inputType='string'
                inputPlaceholder='Add description'
                inputValue={props.bookingDescription ? props.bookingDescription : description}
                inputClassname='w-full text-m'
                inputVariant='outlined'
                multiline={multiline}
                rows={rows}
                icon={<FormatAlignLeft />}
                spacing={2}
                handleOnClick={handleOnClick}
                inputHandleOnChange={input => setDescription(input.target.value)}
              />
              <InputWithIcon
                inputType='string'
                inputPlaceholder='Add Others'
                inputClassname='outline-none w-full'
                inputValue={props.bookingAddOthers ? props.bookingAddOthers : addOthers}
                icon={<PeopleAltOutlined />}
                spacing={2}
                inputHandleOnChange={input => setAddOthers(input.target.value)}
              />
              <BookingButton buttonText='Book' handleOnClick={handleBook} loading={isLoading} />
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default BookingForm;
