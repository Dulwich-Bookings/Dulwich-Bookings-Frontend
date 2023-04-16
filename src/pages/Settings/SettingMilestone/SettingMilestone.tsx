import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import HomeHeader from '@components/Home/HomeHeader/HomeHeader';
import SettingNavigation from '@/components/Settings/SettingNavigation/SettingNavigation';
import { Grid } from '@mui/material';

import { getCurrentUser } from '@/modules/user/userSlice';
import { getCurrentSchool } from '@/modules/school/schoolSlice';
import { settingStateMap } from '@/consts/constants';
import { useApi } from '@/api/ApiHandler';
import { retrieveAllData } from '@/utilities/api';
import Loading from '@/components/Loading/Loading';
import UnsupportedSettings from '@/pages/UnsupportedPages/UnsupportedSetting';
import MilestoneDetails from '@/components/Settings/SettingBody/MilestoneDetails/MilestoneDetails';
import MilestoneService from '@/api/milestone/MilestoneService';
import { MilestoneData } from '@/modules/Milestones/Types';

const SettingMilestone = () => {
  const currentUser = useSelector(getCurrentUser);
  const currentSchool = useSelector(getCurrentSchool);

  const [getMilestones] = useApi(() => MilestoneService.getSelf(), false, true, false);
  const [milestones, setMilestones] = useState<MilestoneData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const allMilestoneData = await retrieveAllData<MilestoneData[]>(getMilestones);

    setMilestones(allMilestoneData?.filter(d => d.schoolId === currentSchool?.id) ?? []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {currentUser && currentSchool && (
        <>
          <HomeHeader currentSchool={currentSchool} currentUser={currentUser} />
          <main>
            <Grid container className='w-screen h-screen'>
              <SettingNavigation isClicked={settingStateMap.MILESTONE} />

              <Grid
                container
                className='settingLaptop:w-9/12 settingLaptop:pl-0 settingPhone:w-11/12 settingPhone:pl-12 settingPhone:block hidden pt-10 '
              >
                {isLoading ? <Loading /> : <MilestoneDetails milestones={milestones} handleRefresh={fetchData} />}
              </Grid>
              <UnsupportedSettings />
            </Grid>
          </main>
        </>
      )}
    </>
  );
};

export default SettingMilestone;
