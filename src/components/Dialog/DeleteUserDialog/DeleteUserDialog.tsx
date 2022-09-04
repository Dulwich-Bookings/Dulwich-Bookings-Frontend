import React from 'react';
import { useApi } from '@/api/ApiHandler';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import { UserData } from '@/modules/user/types';
import UserService from '@/api/user/UserService';

type Props = {
  user: UserData;
  dialogState: boolean;
  successDialog: () => void;
  closeDialog: () => void;
};

const DeleteUserDialog = ({ user, dialogState, successDialog, closeDialog }: Props) => {
  const [deleteUser] = useApi((data: UserData) => UserService.deleteUserById(data.id ?? 0), true, true);

  const handleDeleteUser = async () => {
    try {
      const sendReq = await deleteUser(user.id);

      if (sendReq.isSuccess) {
        successDialog();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DialogWrapper
        isOpen={dialogState}
        handleClose={closeDialog}
        handleSubmit={handleDeleteUser}
        title='Confirm Delete User?'
        textBody='Deleting the User will be invertible. Do you wish to continue?'
        buttonOneText='Close'
        buttonTwoText='Delete'
      />
    </>
  );
};

export default DeleteUserDialog;
