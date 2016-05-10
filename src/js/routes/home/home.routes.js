(function() {
  angular.module('imperium').config(['$stateProvider', '$urlRouterProvider', HomeRoutes]);

  function HomeRoutes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: "home.html"
    });
  };
})();
