(function() {
  angular
    .module("app.controllers")
    .controller("authCtrl", authCtrl);

  authCtrl.$inject = ["$auth", "$state", "navbarService", "periodService"];

  function authCtrl($auth, $state, navbarService, periodService) {
    var vm = this;

    vm.user = {};

    vm.authenticate = authenticate;

    verifyUserAuthentication();

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
  };
})();
