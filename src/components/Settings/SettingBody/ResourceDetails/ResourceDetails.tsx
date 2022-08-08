import React, { useEffect, useState } from 'react';
import { useApi } from '@/api/ApiHandler';
import TagService from '@/api/tag/TagService';
import UserService from '@/api/user/UserService';
import ResourceMapService from '@/api/resourceMap/ResourceMapService';

import SettingHeader from '@/components/Settings/SettingBody/SettingHeader/SettingHeader';
import HomeResourceList from '@/components/Home/HomeResources/HomeResourceList/HomeResourceList';
import AddRoomForm from '@/components/AddResource/Forms/AddRoomForm/AddRoomForm';
import AddSubscriptionForm from '@/components/AddResource/Forms/AddSubscriptionForm/AddSubscriptionForm';
import { Grid, Stack } from '@mui/material';

import { resourceTypes, searchStateMap } from '@/consts/constants';
import { UserData } from '@/modules/user/types';
import { ResourceData } from '@/modules/resource/types';
import { ResourceMapData } from '@/modules/resourceMap/types';
import { SubscriptionData } from '@/modules/subscription/types';
import { TagData } from '@/modules/tag/types';
import { retrieveAllData } from '@/utilities/api';

type Props = {
  user: UserData;
};

const ResourceDetails = ({ user: userSelf }: Props) => {
  const [getAllTags] = useApi(() => TagService.getAllTags(), false, true, false);
  const [getAllUsers] = useApi(() => UserService.getAllUsers(), false, true, false);
  const [getAllResourceMaps] = useApi(() => ResourceMapService.getAllResourceMaps(), false, true, false);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editData, setEditData] = useState<ResourceData | SubscriptionData>();
  const [editTags, setEditTags] = useState<TagData[]>();
  const [editUsers, setEditUsers] = useState<UserData[]>();
  const [tags, setTags] = useState<TagData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [resourceMaps, setResourceMaps] = useState<ResourceMapData[]>([]);

  const fetchData = async () => {
    const allTagData = await retrieveAllData<TagData[]>(getAllTags);
    const allUserData = await retrieveAllData<UserData[]>(getAllUsers);
    const AllResourceMaps = await retrieveAllData<ResourceMapData[]>(getAllResourceMaps);

    setTags(allTagData ?? []);
    setUsers(allUserData ?? []);
    setResourceMaps(AllResourceMaps ?? []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEditResourceHandler = (data: ResourceData | SubscriptionData, tags: TagData[]) => {
    const filteredResourceMap = resourceMaps.filter(r => {
      if (data.type === resourceTypes.RESOURCE) {
        r.resourceId === data.id;
      } else {
        r.subscriptionId === data.id;
      }
    });

    setEditMode(true);
    setEditData(data);
    setEditTags(tags);
    setEditUsers(users.filter(user => filteredResourceMap.filter(r => r.userId === user.id)));
  };

  const closeEditResourceHandler = () => {
    setEditMode(false);
  };

  return (
    <>
      <Stack className='w-full'>
        <Grid container className='justify-start'>
          <SettingHeader title={`${(!editMode && 'My Resources') || (editMode && 'Edit Resources')}`} />
        </Grid>

        {!editMode && (
          <Grid container className='justify-center pt-10'>
            <HomeResourceList
              searchedInput=''
              searchState={searchStateMap.ALL}
              isBookmarksViewClicked={false}
              isRvViewClicked={false}
              currentUser={userSelf}
              className='justify-center'
              editMode={!editMode}
              editResourceHandler={openEditResourceHandler}
            />
          </Grid>
        )}

        {editMode && editData?.type === resourceTypes.RESOURCE && (
          <Grid container>
            <AddRoomForm
              formClassName='px-0'
              userData={users}
              tagData={tags}
              resourceMapData={resourceMaps}
              oldFormData={editData as ResourceData}
              oldFormTags={editTags}
              oldFormUsers={editUsers}
              editMode={editMode}
              closeEditForm={closeEditResourceHandler}
            />
          </Grid>
        )}

        {editMode && editData?.type === resourceTypes.SUBSCRIPTION && (
          <Grid container>
            <AddSubscriptionForm
              formClassName='px-0'
              userData={users}
              tagData={tags}
              resourceMapData={resourceMaps}
              oldFormData={editData as SubscriptionData}
              oldFormTags={editTags}
              oldFormUsers={editUsers}
              editMode={editMode}
              closeEditForm={closeEditResourceHandler}
            />
          </Grid>
        )}
      </Stack>
    </>
  );
};

export default ResourceDetails;
