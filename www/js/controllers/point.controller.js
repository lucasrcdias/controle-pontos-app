(function() {
  angular
    .module("app.controllers")
    .controller("pointCtrl", pointCtrl);

  pointCtrl.$inject = ["navbarService", "pointService", "pointValidator", "$auth", "$state"];

  function pointCtrl(navbarService, pointService, pointValidator, $auth, $state) {
    var vm = this;

    vm.authenticating = true;

    vm.setPoint = setPoint;

    verifyUserAuthentication();

    function setPoint() {
      if (pointValidator.validateMaximumPoints()){
        pointService.setPoint()
        .then(onSuccess)
        .catch(onFail);
      }
    };

    function onSuccess(response) {
      pointValidator.incrementPoint();

      vm.coordinates = {
        'latitude': response.coords.latitude,
        'longitude': response.coords.longitude
      };
    };

    function onFail(error) {
      console.log(error);
    };

    function verifyUserAuthentication() {
      if ($auth.isAuthenticated()) {
        vm.authenticating = false;
        navbarService.updateAuthState(true);
      } else {
        $state.go("auth");
      }
    };
  };
})();
