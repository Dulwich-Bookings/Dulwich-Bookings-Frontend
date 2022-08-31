import React, { useState } from 'react';

import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import { Grid, Stack } from '@mui/material';
import { UserData } from '@/modules/user/types';
import { TagData } from '@/modules/tag/types';
import TagTable from './TagTable/TagTable';
import ModalWrapper from '@/components/Modals/ModalWrapper/ModalWrapper';
import EditTagModal from '@/components/Modals/EditTagModal/EditTagModal';

type Props = {
  user: UserData;
  tags: TagData[];
  handleSuccessEdit: () => void;
};

const TagDetails = ({ tags: tags, handleSuccessEdit }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editTagData, setEditTagData] = useState<TagData>();

  const handleEditTag = (tag: TagData) => {
    setOpenModal(true);
    setEditTagData(tag);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Stack className='w-full'>
        <Grid container className='justify-start'>
          <SettingHeader title={`My Tags`} />
        </Grid>

        <Grid container className='justify-center pt-10'>
          <TagTable tags={tags} editTagHandler={handleEditTag} />
          {editTagData && (
            <ModalWrapper
              isOpen={openModal}
              handleClose={handleCloseModal}
              bodyComponent={<EditTagModal tagData={editTagData} handleSuccess={handleSuccessEdit} handleClose={handleCloseModal} />}
            />
          )}
        </Grid>
      </Stack>
    </>
  );
};

export default TagDetails;
