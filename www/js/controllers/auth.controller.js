(function() {
  angular
    .module("app.controllers")
    .controller("authCtrl", authCtrl);

  authCtrl.$inject = ["$timeout", "$rootScope", "$state"];

  function authCtrl($timeout, $rootScope, $state) {
    var vm = this;

    vm.user = {};

    vm.authenticate = authenticate;

    function authenticate(user) {
      vm.authenticating = true;

      $timeout(function() {
        vm.authenticating = false;

        $rootScope.$emit("authChanged", true);
        $state.go("point");

      }, 1000);
    };

    function onSuccess(response) {
      console.log(response);
    };

    function onFail(error) {
      console.log(error);
    };

    function removeBackdrop() {
      vm.authenticating = false;
    };
  };
})();
