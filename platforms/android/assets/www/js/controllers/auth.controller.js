(function() {
  angular
    .module("app.controllers")
    .controller("authCtrl", authCtrl);

  authCtrl.$inject = ["$rootScope", "$auth", "$state", "navbarService", "periodService"];

  function authCtrl($rootScope, $auth, $state, navbarService, periodService) {
    var vm = this;

    vm.user      = {};
    vm.connected = false;

    vm.authenticate = authenticate;

    verifyUserAuthentication();

    $rootScope.$on("networkChanged", updateConnectionStatus);

    function authenticate(user) {
      vm.authenticating = true;

      $auth.login({ 'user': user })
        .then(onSuccess)
        .catch(onFailure)
        .finally(removeBackdrop);
    };

    function onSuccess(response) {
      navbarService.updateAuthState(true);
      periodService.loadPeriod();
      $state.go("point");
    };

    function onFailure(error) {
      vm.user.password = "";
      vm.user.errors   = error.data.user.errors;

      vm.userForm.$setPristine();
      navbarService.updateAuthState(false);
    };

    function removeBackdrop() {
      vm.authenticating = false;
    };

    function verifyUserAuthentication() {
      if ($auth.isAuthenticated()) {
        $state.go("point");
      }
    };

    function updateConnectionStatus(event, isConnected) {
      console.log(isConnected);
      vm.connected = isConnected;
    };
  };
})();
