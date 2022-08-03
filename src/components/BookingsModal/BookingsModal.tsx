import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Calendar from '@/components/BookingsModal/Calendar/Calendar';
import BookingsHeader from '@/components/BookingsModal/BookingsHeader/BookingsHeader';
import { dummyCalendarData } from '@/consts/dummyData';
import { Stack, Modal, Box, ThemeProvider, createTheme } from '@mui/material';
import { UserData } from '@/modules/user/types';

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
  title: string;
  description: string;
  currentUser: UserData;
};

const BookingsModal = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal className='flex justify-center items-center' open={props.openState} onClose={props.handleCloseModal}>
        <Box className='calendarLaptop:w-11/12 calendarLaptop:h-5/6 calendarLaptop:mt-12 calendarLaptop:rounded-lg w-full h-full px-14 pt-10 bg-white'>
          <CloseIcon onClick={props.handleCloseModal} className='float-right cursor-pointer hover:text-grayAccent' />
          <Stack className='h-full' spacing={{ xs: 1, md: -6 }}>
            <BookingsHeader id={1} title={props.title} description={props.description} />
            <Calendar data={dummyCalendarData} currentUser={props.currentUser} />
          </Stack>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default BookingsModal;
