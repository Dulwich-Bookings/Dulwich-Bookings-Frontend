import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Calendar from '@components/Calendar/Calendar';
import BookingsHeader from '@components/BookingsModal/BookingsHeader.tsx/BookingsHeader';
import { dummyCalendarData, dummyResourceData } from '@/consts/dummyData';
import { Stack, Modal, Box, ThemeProvider, createTheme } from '@mui/material';

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
};

const BookingsModal = ({ openState, handleCloseModal }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal className='flex justify-center items-center' open={openState} onClose={handleCloseModal}>
        <Box className='laptop:w-11/12 laptop:h-5/6 laptop:mt-12 laptop:rounded-lg w-full h-full px-14 pt-10 bg-bgWhite'>
          <CloseIcon onClick={handleCloseModal} className='float-right cursor-pointer hover:text-grayAccent' />
          <Stack className='h-full' spacing={{ xs: 1, md: -6 }}>
            <BookingsHeader id={1} title={dummyResourceData.title} description={dummyResourceData.description} />
            <Calendar data={dummyCalendarData} />
          </Stack>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default BookingsModal;
