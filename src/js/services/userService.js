angular
  .module('eventApp')
  .service('userService', userService);

// userService.$inject = [];
function userService() {
  const vm = this;
  vm.currentUser =  {} ;
}
