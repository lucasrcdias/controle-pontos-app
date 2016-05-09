(function() {
  angular.module('imperium').config(['$stateProvider', HomeRoutes]);

  function HomeRoutes($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: "home.html"
    });
  };
})();
