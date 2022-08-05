import React, { ReactElement } from 'react';
import { Box, Modal } from '@mui/material';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  bodyComponent: ReactElement;
};

const ModalWrapper = ({ isOpen, handleClose, bodyComponent }: Props) => {
  return (
    <Modal className='backdrop-blur-sm' open={isOpen} onClose={handleClose}>
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{bodyComponent}</Box>
    </Modal>
  );
};

export default ModalWrapper;
