import { SettingState } from '@/consts/constants';
import { UserData } from '@/modules/user/types';
import React from 'react';
import AccountDetails from './AccountDetails/AccountDetails';

type Props = {
  viewState: SettingState;
  user: UserData;
};

const SettingBody = ({ viewState, user }: Props) => {
  return (
    <>
      {viewState.account && <AccountDetails user={user} />}
      {viewState.resource && <div>My Resources</div>}
      {viewState.tag && <div>Tag Management</div>}
      {viewState.milestone && <div>Milestones</div>}
      {viewState.users && <div>User Management</div>}
    </>
  );
};

export default SettingBody;
