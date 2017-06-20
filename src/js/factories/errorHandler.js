angular
  .module('eventApp')
  .factory('ErrorHandler', ErrorHandler);


ErrorHandler.$inject = ['$rootScope'];
// this is the interceptor - it has to return something
function ErrorHandler($rootScope) {
  return {
    //responseError: function(err) { -- the same thing!
    responseError(err) {
      // $rootscope.$broadast will send out an 'error' with the data err.
      // rootscope is global
      $rootScope.$broadcast('error', err);

    }
  };
}
