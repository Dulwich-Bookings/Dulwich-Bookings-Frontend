import React from 'react';
import { useApi } from '@/api/ApiHandler';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import UserService from '@/api/user/UserService';

type Props = {
  isBulk: boolean;
  userId?: number;
  bulkUserId?: number[];
  dialogState: boolean;
  successDialog: () => void;
  closeDialog: () => void;
};

const DeleteUserDialog = ({ isBulk, userId, bulkUserId, dialogState, successDialog, closeDialog }: Props) => {
  const [deleteUser] = useApi(() => UserService.deleteUserById(userId ?? 0), true, true);
  const [bulkUserDelete] = useApi((ids: number[]) => UserService.bulkDeleteUserByid(ids ?? []), true, true);

  const handleBulkDelete = async () => {
    try {
      const selectedIds = bulkUserId;
      const sendReq = await bulkUserDelete(selectedIds);
      if (sendReq.isSuccess) {
        successDialog();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const sendReq = await deleteUser();

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
        handleSubmit={isBulk ? handleBulkDelete : handleDeleteUser}
        title='Confirm Delete User?'
        textBody='Deleting the User will be invertible. Do you wish to continue?'
        buttonOneText='Close'
        buttonTwoText='Delete'
      />
    </>
  );
};

export default DeleteUserDialog;
