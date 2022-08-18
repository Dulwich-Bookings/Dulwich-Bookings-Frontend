import React, { ReactElement } from 'react';
import { Modal } from '@mui/material';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  bodyComponent: ReactElement;
};

const ModalWrapper = ({ isOpen, handleClose, bodyComponent }: Props) => {
  return (
    <Modal className='backdrop-blur-sm flex justify-center items-center' open={isOpen} onClose={handleClose}>
      {bodyComponent}
    </Modal>
  );
};

export default ModalWrapper;
