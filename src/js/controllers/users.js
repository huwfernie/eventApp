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
  const vm = this;

  function getCurrentUser() {
    const data = $auth.getPayload();
    User
      .get({ id: data.userId })
      .$promise
      .then((user) => {
        console.log(user);
        vm.currentUser = user;
        userService.currentUser = user;
      });
  }
  getCurrentUser();

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
