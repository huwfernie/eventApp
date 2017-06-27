angular
  .module('eventApp')
  .controller('RegisterCtrl', RegisterCtrl) // name the function
  .controller('LoginCtrl', LoginCtrl); // name the function


RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }

  vm.submit = submit;
}


LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    console.log('credentials', vm.credentials);
    $auth.login(vm.credentials)
      .then((user) => $state.go('profile', {params: {user}} ));
  }
  vm.submit = submit;

  // function authenticate(provider) {
  //   $auth.authenticate(provider)
  //     .then(() => $state.go('eventsIndex'));
  // }
  // vm.authenticate = authenticate;

  function authenticate(provider) {
    $auth.authenticate(provider)
      .then(() => $state.go('eventsIndex')); // where to go after login
  }
  vm.authenticate = authenticate;
}
