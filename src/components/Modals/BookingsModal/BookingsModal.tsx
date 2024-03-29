import React, { useState, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Calendar from '@/components/Modals/BookingsModal/Calendar/Calendar';
import BookingsHeader from '@/components/Modals/BookingsModal/BookingsHeader/BookingsHeader';
import ModalWrapper from '@/components/Modals/ModalWrapper/ModalWrapper';
import { Stack, Box, ThemeProvider, createTheme } from '@mui/material';

import { UserData } from '@/modules/user/types';
import { SchoolData } from '@/modules/school/types';
import { ResourceData } from '@/modules/resource/types';
import { ResourceMapData } from '@/modules/resourceMap/types';

import { useApi } from '@/api/ApiHandler';
import { retrieveAllData } from '@/utilities/api';
import ResourceMapService from '@/api/resourceMap/ResourceMapService';

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
  resourceData: ResourceData;
  currentUser: UserData;
  currentSchool: SchoolData;
};

const BookingsModal = (props: Props) => {
  const [getAllResourceMaps] = useApi(() => ResourceMapService.getAllResourceMaps(), false, true, false);

  const [resourceMaps, setResourceMaps] = useState<ResourceMapData[]>([]);

  const fetchData = async () => {
    const AllResourceMapData = await retrieveAllData<ResourceMapData[]>(getAllResourceMaps);

    setResourceMaps(AllResourceMapData ?? []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ModalWrapper
        isOpen={props.openState}
        handleClose={props.handleCloseModal}
        bodyComponent={
          <Box className='calendarLaptop:w-11/12 calendarLaptop:h-5/6 calendarLaptop:mt-12 calendarLaptop:rounded-lg w-full h-full px-14 pt-10 bg-white'>
            <CloseIcon onClick={props.handleCloseModal} className='float-right cursor-pointer hover:text-grayAccent' />
            <Stack className='h-full' spacing={{ xs: 1, md: -6 }}>
              <BookingsHeader id={1} resourceData={props.resourceData} />
              <Calendar
                resourceData={props.resourceData}
                currentUser={props.currentUser}
                currentSchool={props.currentSchool}
                resourceMaps={resourceMaps}
              />
            </Stack>
          </Box>
        }
      />
    </ThemeProvider>
  );
};

export default BookingsModal;
