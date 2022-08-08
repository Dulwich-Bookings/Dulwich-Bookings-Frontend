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
  home: {
    main: '/home',
    viewAll: '/home/viewAll',
  },
  addResource: {
    main: '/addResource',
    addRoom: '/addResource/room',
    addSubscription: '/addResource/subscription',
    addTag: '/addResource/tag',
  },
  settings: '/settings',
};

export default Routes;
