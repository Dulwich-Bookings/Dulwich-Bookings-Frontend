import React, { useEffect } from 'react';
import { useApi } from '@/api/ApiHandler';
import AuthService from '@/api/auth/AuthService';

const Landing = () => {
  const [login] = useApi(() => AuthService.login('student23@stu.dulwich.org', 'asdasd'), true, true);

  const loginUser = async () => {
    const loginUser = await login();
    if (loginUser.isSuccess) {
      console.log(loginUser);
    }
  };

  useEffect(() => {
    loginUser();
  }, []);

  return <div>Landing Page</div>;
};

export default Landing;
