(function() {
  angular
    .module("app.directives")
    .directive("imNavbar", imNavbar);

  function imNavbar() {
    var directive = {
      restrict: "E",
      templateUrl: "navbar.html",
      controller: imNavbarCtrl,
      controllerAs: "vm",
      bindToController: true
    };

    imNavbarCtrl.$inject = ["$rootScope", "$state"];

    function imNavbarCtrl($rootScope, $state) {
      var vm = this;

      vm.isAuthenticated = false;

      vm.signOut = signOut;

      $rootScope.$on("authChanged", updateUser);

      function updateUser(event, isAuthenticated) {
        vm.isAuthenticated = isAuthenticated;
      };

      function signOut() {
        $rootScope.$emit("authChanged", false);
        $state.go("auth");
      };
    };

    return directive;
  };
})();
