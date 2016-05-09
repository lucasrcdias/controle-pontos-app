(function() {
  angular.module('imperium').config(["$stateProvider", AuthRoutes]);

  function AuthRoutes($stateProvider) {
    $stateProvider.state('auth', {
      url: '/auth',
      templateUrl: 'auth.html'
    });
  }
})();
