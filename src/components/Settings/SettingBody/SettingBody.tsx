import React from 'react';

import AccountDetails from '@/components/Settings/SettingBody/AccountDetails/AccountDetails';
import ResourceDetails from '@/components/Settings/SettingBody/ResourceDetails/ResourceDetails';

import { SettingState } from '@/consts/constants';
import { UserData } from '@/modules/user/types';

type Props = {
  viewState: SettingState;
  user: UserData;
};

const SettingBody = ({ viewState, user }: Props) => {
  return (
    <>
      {viewState.account && <AccountDetails user={user} />}
      {viewState.resource && <ResourceDetails user={user} />}
      {viewState.tag && <div>Tag Management</div>}
      {viewState.milestone && <div>Milestones</div>}
      {viewState.users && <div>User Management</div>}
    </>
  );
};

export default SettingBody;
