angular
  .module('eventApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('eventsIndex', {
      url: '/events',
      templateUrl: 'js/views/events/index.html',
      controller: 'EventsIndexCtrl as eventsIndex'
    })
    .state('eventsNew', {
      url: '/events/new',
      templateUrl: 'js/views/events/new.html',
      controller: 'EventsNewCtrl as eventsNew'
    })
    .state('eventsShow', {
      url: '/events/:id',
      templateUrl: 'js/views/events/show.html',
      controller: 'EventsShowCtrl as eventsShow'
    })
    .state('eventsEdit', {
      url: '/events/:id/edit',
      templateUrl: 'js/views/events/edit.html',
      controller: 'EventsEditCtrl as eventsEdit'
    })
    .state('profile', {
      url: '/users/:id',
      templateUrl: 'js/views/users/index.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    });

  $urlRouterProvider.otherwise('/events');
}
