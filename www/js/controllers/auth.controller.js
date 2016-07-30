(function() {
  angular
    .module("app.controllers")
    .controller("authCtrl", authCtrl);

  authCtrl.$inject = ["$auth", "$rootScope", "$state"];

  function authCtrl($auth, $rootScope, $state) {
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
      $rootScope.$emit("authChanged", true);
      $state.go("point");
    };

    function onFailure(error) {
      vm.user.password = "";
      vm.userForm.password.$setPristine();
      $rootScope.$emit("authChanged", false);
      vm.user.errors = error.data.user.errors;
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
