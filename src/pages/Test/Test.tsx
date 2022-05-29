import React, { useEffect } from 'react';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';
import UserService from '@/api/user/UserService';

const Test = () => {
  const [login] = useApi(() => AuthService.login('student23@stu.dulwich.org', 'asdasd'), true, true);
  const [getAllUsers] = useApi(() => UserService.getAllUsers(), true, true);

  const fetchData = async () => {
    const loginUser = await login();
    const allUsers = await getAllUsers();
    if (loginUser.isSuccess && allUsers.isSuccess) {
      console.log(allUsers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Put your test components here to see what they look like!</div>;
};

export default Test;
