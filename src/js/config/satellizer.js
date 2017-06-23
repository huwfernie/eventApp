// angular
//   .module('eventApp')
//   .config(Auth); // name the function
//
//
// Auth.$inject = ['$authProvider'];
// function Auth($authProvider) {
//   $authProvider.signupUrl = '/api/register';
//   $authProvider.loginUrl = '/api/login';
//
//   $authProvider.github({
//     clientId: 'd2cfd327c82736a6383d'//,
//     // url: '/api/oauth/github'
//   });
//
//   $authProvider.facebook({
//     clientId: '1234994726408286', // need to update
//     url: '/api/oauth/facebook'
//   });
//
//   $authProvider.instagram({
//     clientId: '123409dfcabd4ec38a730f3895732495', // need to updated
//     url: '/api/oauth/instagram'
//   });
//
//   $authProvider.tokenPrefix = '';
// }


// angular
//   .module('eventApp')
//   .config(Auth); // name the function
//
// Auth.$inject = ['$authProvider'];
//
// function Auth($authProvider) {
//   $authProvider.signupUrl = '/api/register';
//   $authProvider.loginUrl = '/api/login';
// }

angular
  .module('eventApp')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {

  // for form based register and login
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  // for github oAuth
  $authProvider.github({
    clientId: 'd2cfd327c82736a6383d', // change this for different apps
    url: '/api/oauth/github'
  });
}
