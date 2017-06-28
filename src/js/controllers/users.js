angular
  .module('eventApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersNewCtrl', UsersNewCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();
  vm.all = [1,2,3,4];
}


/*
find the userId from the jwt token and then get the user, store the current user in userService
*/
UsersShowCtrl.$inject = ['User', '$auth', '$state', 'userService'];
function UsersShowCtrl(User, $auth, $state, userService) {
  const demoArray = [{
    title: 'baseball for beginers',
    details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '01-07-2017',
    image: 'logo.png'
  },{
    title: 'baseball for beginers',
    details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '01-07-2017',
    image: 'logo.png'
  }];
  
  const vm = this;
  vm.activeTab = null;
  changeTab(1);

  function getCurrentUser() {
    const data = $auth.getPayload();
    User
      .get({ id: data.userId })
      .$promise
      .then((user) => {
        console.log('user controll getCurrentUser', user);
        vm.currentUser = user;
        userService.currentUser = user;
      });
  }
  getCurrentUser();

  function changeTab(x) {
    const allTabs = document.getElementsByClassName('tabs');
    if(vm.activeTab !== x) {
      vm.activeTab = x;
      for(let i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove('active');
      }
      allTabs[x-1].classList.add('active');

      switch(x-1) {
        case 0:
          console.log('did I run?');
          vm.events = demoArray;
          break;
        case 1:
          vm.events = [1,2,3];
          break;
        case 2:
          vm.events = [1,2,3,4];
          break;
        case 3:
          vm.events = [1,2,3,4,5];
          break;
        case 4:
          vm.events = [1,2,3,4,5,6];
      }
    }
  }
  vm.changeTab = changeTab;






  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('usersIndex'));
  }
  vm.delete = usersDelete;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    vm.user
      .$update()
      .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;
}


// old stuff



UsersNewCtrl.$inject = ['User', '$state'];
function UsersNewCtrl(User, $state) {
  const vm = this;
  vm.user = {};

  function usersCreate() {
    User
      .save(vm.user)
      .$promise
      .then(() => $state.go('usersIndex'));
  }

  vm.create = usersCreate;
}
