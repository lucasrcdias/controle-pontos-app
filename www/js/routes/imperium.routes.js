(function() {
  angular
    .module('app.routes')
    .config(imperiumRoutes);

  imperiumRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function imperiumRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/point");

    $stateProvider
      .state("point", {
        url: "/point",
        templateUrl: "point.html",
        controller: "pointCtrl",
        controllerAs: "vm",
        bindToController: true
      })
      .state("auth", {
        url: "/auth",
        templateUrl: "auth.html",
        controller: "authCtrl",
        controllerAs: "vm",
        bindToController: true
      });
  };
})();
