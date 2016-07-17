(function() {
  angular
    .module("app.controllers")
    .controller("authCtrl", authCtrl);

  authCtrl.$inject = ["$timeout"];

  function authCtrl($timeout) {
    var vm = this;

    vm.user = {};

    vm.authenticate = authenticate;

    function authenticate(user) {
      vm.authenticating = true;

      $timeout(function() {
        vm.authenticating = false;
      }, 1000);

      // userService.authenticate(user)
      //   .then(onSuccess)
      //   .catch(onFail)
      //   .finally(removeBackdrop);
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
