import React, { useState } from 'react';

import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import { Grid, Stack } from '@mui/material';
import { UserData } from '@/modules/user/types';
import { TagData } from '@/modules/tag/types';
import TagTable from './TagTable/TagTable';
import ModalWrapper from '@/components/Modals/ModalWrapper/ModalWrapper';
import EditTagModal from '@/components/Modals/EditTagModal/EditTagModal';
import DeleteTagDialog from '@/components/Dialog/DeleteTagDialog/DeleteTagDialog';

type Props = {
  user: UserData;
  tags: TagData[];
  handleRefresh: () => void;
};

const TagDetails = ({ tags: tags, handleRefresh }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editTagData, setEditTagData] = useState<TagData>();
  const [deleteTagData, setDeleteTagData] = useState<TagData>();

  const handleEditTag = (tag: TagData) => {
    setOpenModal(true);
    setEditTagData(tag);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteTag = (tag: TagData) => {
    setDeleteTagData(tag);
    setOpenDialog(true);
  };

  return (
    <>
      <Stack className='w-full'>
        <Grid container className='justify-start'>
          <SettingHeader title={`My Tags`} />
        </Grid>

        <Grid container className='justify-center pt-10'>
          <TagTable tags={tags} editTagHandler={handleEditTag} deleteTagHandler={handleDeleteTag} />
          {editTagData && (
            <ModalWrapper
              isOpen={openModal}
              handleClose={handleCloseModal}
              bodyComponent={
                <EditTagModal
                  tagData={editTagData}
                  handleSuccess={() => {
                    setOpenModal(false);
                    handleRefresh();
                  }}
                  handleClose={handleCloseModal}
                />
              }
            />
          )}
          {deleteTagData && (
            <DeleteTagDialog
              tag={deleteTagData}
              dialogState={openDialog}
              successDialog={() => {
                setOpenDialog(false);
                handleRefresh();
              }}
              closeDialog={() => setOpenDialog(false)}
            />
          )}
        </Grid>
      </Stack>
    </>
  );
};

export default TagDetails;
