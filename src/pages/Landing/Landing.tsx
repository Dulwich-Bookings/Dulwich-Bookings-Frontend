import React, { useEffect } from 'react';
import { useApi } from '@/api/ApiHandler';
import UserService from '@/api/user/UserService';

const Landing = () => {
  const [getUsers] = useApi(() => UserService.getAllUsers(), true, true);

  const fetchData = async () => {
    const userRes = await getUsers();
    if (userRes.isSuccess) {
      console.log(userRes);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Landing Page</div>;
};

export default Landing;
