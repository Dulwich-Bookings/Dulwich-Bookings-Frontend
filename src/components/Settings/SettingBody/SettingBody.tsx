import { SettingState } from '@/consts/constants';
import React from 'react';

type Props = {
  viewState: SettingState;
};

const SettingBody = ({ viewState }: Props) => {
  return (
    <>
      {viewState.account && <div>Account Details</div>}
      {viewState.resource && <div>My Resources</div>}
      {viewState.tag && <div>Tag Management</div>}
      {viewState.milestone && <div>Milestones</div>}
      {viewState.users && <div>User Management</div>}
    </>
  );
};

export default SettingBody;
