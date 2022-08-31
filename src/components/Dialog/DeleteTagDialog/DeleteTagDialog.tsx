import React from 'react';
import { useApi } from '@/api/ApiHandler';
import TagService from '@/api/tag/TagService';
import { TagData } from '@/modules/tag/types';
import DialogWrapper from '../DialogWrapper/DialogWrapper';

type Props = {
  tag: TagData;
  dialogState: boolean;
  successDialog: () => void;
  closeDialog: () => void;
};

const DeleteTagDialog = ({ tag, dialogState, successDialog, closeDialog }: Props) => {
  const [deleteTag] = useApi((data: TagData) => TagService.deleteTagById(data.id ?? 0), true, true);

  const handleDeleteTag = async () => {
    try {
      const sendReq = await deleteTag(tag);

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
        handleSubmit={handleDeleteTag}
        title='Confirm Delete Tag?'
        textBody='Deleting the Tag will be invertible. Do you wish to continue?'
        buttonOneText='Close'
        buttonTwoText='Delete'
      />
    </>
  );
};

export default DeleteTagDialog;
