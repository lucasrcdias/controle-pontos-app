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
    loadNextPoint();

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

    function loadNextPoint() {
      vm.nextPoint = undefined;

      var now    = new Date();
      var hour   = now.getHours();
      var minute = now.getMinutes();

      var periods = ["start_at", "interval_start", "interval_finish", "finish_at"];

      for (period in periods) {
        period = periods[period];

        var periodTime   = new Date(localStorage[period]);
        var periodHour   = periodTime.getHours();
        var periodMinute = periodTime.getMinutes();

        if ((hour < periodHour) || ( hour === periodHour && (minute < periodMinute))) {
          periodMinute = periodMinute === 0 ? "00" : periodMinute;
          vm.nextPoint = periodHour + ":" + periodMinute;
          break;
        }
      }
    };
  };
})();
