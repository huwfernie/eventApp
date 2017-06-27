angular
  .module('eventApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'userService', 'User'];
function MainCtrl($rootScope, $state, $auth, userService, User) {
  const vm = this;
  vm.currentUser = {};

  vm.isAuthenticated = $auth.isAuthenticated;

  const data = $auth.getPayload();
  User
    .get({ id: data.userId })
    .$promise
    .then((user) => {
      console.log('this', user.username);
      vm.currentUser.username = user.username;
      userService.currentUser = user;
    });


  // rootscope is listening - it will pick up any 'error'
  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    console.log(e, err);
    vm.message = err.data.message; // this is the message from the server
    if(err.status === 401) $state.go('login'); // if unauthorized redirect to login.
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
  });

  function logout() {
    console.log('Logout');
    $auth.logout();
    $state.go('login'); // redirect to login page
  }
  vm.logout = logout;

}
