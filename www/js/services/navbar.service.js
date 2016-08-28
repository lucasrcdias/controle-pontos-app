(function() {
  angular
    .module("app.services")
    .factory("navbarService", navbarService);

  navbarService.$inject = ["$rootScope"];

  function navbarService($rootScope) {
    var service = {
      updateAuthState: updateAuthState
    };

    return service;

    function updateAuthState(state) {
      $rootScope.$emit("authChanged", state);
    };
  };
})();
