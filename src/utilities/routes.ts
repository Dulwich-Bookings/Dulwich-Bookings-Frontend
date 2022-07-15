const Routes = {
  test: '/test',
  authentication: {
    login: '/auth/login',
    signUp: '/auth/signUp',
    forgetPassword: '/auth/forgetPassword',
    setPassword: '/auth/setPassword',
    confirmEmail: '/auth/confirmEmail',
    isTempUser: '/auth/isTempUser',
  },
  base: '/',
  home: '/home',
  addResource: {
    main: '/addResource',
    addRoom: '/addResource/room',
  },
};

export default Routes;
