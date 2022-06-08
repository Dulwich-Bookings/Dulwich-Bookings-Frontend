import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Calendar from '@components/Calendar/Calendar';
import AddCalendarButton from '@/components/BookingsModal/AddCalendarButton/AddCalendarButton';
import { Stack, Typography, Modal, Box, ThemeProvider, createTheme } from '@mui/material';

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
        <Box className='laptop:w-11/12 laptop:h-5/6 laptop:mt-12 laptop:rounded-lg w-full h-full px-14 pt-10 bg-white'>
          <CloseIcon onClick={handleCloseModal} className='float-right cursor-pointer hover:text-grayAccent' />
          <Stack className='h-full' spacing={{ xs: 1, md: -7.2 }}>
            <Box>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Typography variant='h4'>Tech 4</Typography>
                <AddCalendarButton />
              </Stack>
              <Typography className='bookingSafe:block hidden w-1/3' variant='subtitle2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lorem nisl, vulputate non neque vel.
              </Typography>
            </Box>
            <Box className='h-full'>
              <Calendar />
            </Box>
          </Stack>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default BookingsModal;
