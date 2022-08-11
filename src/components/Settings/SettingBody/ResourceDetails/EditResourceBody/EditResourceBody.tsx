import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import AddRoomForm from '@/components/AddResource/Forms/AddRoomForm/AddRoomForm';
import { Grid, Stack } from '@mui/material';

import { UserData } from '@/modules/user/types';
import { ResourceData } from '@/modules/resource/types';
import { ResourceMapData } from '@/modules/resourceMap/types';
import { TagData } from '@/modules/tag/types';
import { TagMapData } from '@/modules/tagMap/types';

type Props = {
  oldFormData: ResourceData;
  tags: TagData[];
  users: UserData[];
  resourceMaps: ResourceMapData[];
  tagMaps: TagMapData[];
};

const EditResourceBody = (props: Props) => {
  const [oldUsers, setOldUsers] = useState<UserData[]>([]);
  const [oldTags, setOldTags] = useState<TagData[]>([]);

  const history = useHistory();

  const mapData = () => {
    const filteredResourceMapIds = props.resourceMaps
      .filter(r => r.subscriptionId === props.oldFormData.id)
      .map(resourceMap => resourceMap.userId);
    const filteredTagMapIds = props.tagMaps.filter(r => r.subscriptionId === props.oldFormData.id).map(tagMap => tagMap.tagId);

    setOldUsers(props.users.filter(user => filteredResourceMapIds.includes(user.id)));
    setOldTags(props.tags.filter(tag => filteredTagMapIds.includes(tag.id)));
  };

  useEffect(() => {
    mapData();
  }, [props.oldFormData, props.resourceMaps, props.tagMaps]);

  const closeEditResourceHandler = () => {
    history.push('/settings/resources');
  };

  return (
    <>
      <Stack className='w-full'>
        <Grid container className='justify-start'>
          <SettingHeader title={`Edit Resources`} />
        </Grid>

        <Grid container>
          <AddRoomForm
            formClassName='px-0'
            userData={props.users}
            tagData={props.tags}
            oldFormData={props.oldFormData}
            oldFormTags={oldTags}
            oldFormUsers={oldUsers}
            editMode={true}
            closeEditForm={closeEditResourceHandler}
          />
        </Grid>
      </Stack>
    </>
  );
};

export default EditResourceBody;
