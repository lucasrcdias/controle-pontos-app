(function() {
  angular
    .module("app.controllers")
    .controller("pointCtrl", pointCtrl);

  pointCtrl.$inject = ["navbarService", "pointService", "pointValidator", "$auth", "$state", "$rootScope", "toastr", "config", "moment"];

  function pointCtrl(navbarService, pointService, pointValidator, $auth, $state, $rootScope, toastr, config, moment) {
    var vm = this;

    vm.saving         = false;
    vm.periods        = undefined;
    vm.connected      = navigator.connection.type !== "none";
    vm.authenticating = true;

    vm.setPoint = setPoint;

    verifyUserAuthentication();
    updateNextPoint();

    $rootScope.$on("networkChanged", updateConnectionStatus);

    function setPoint() {
      if (vm.saving) { return; }

      if (pointValidator.validateMaximumPoints()) {
        vm.saving = true;

        pointService.setPoint(vm.period)
          .then(onSuccess)
          .catch(onFail)
          .finally(unlockSaving);

      } else {
        toastr.error("O limite de marcações diárias já foi atingido (" + config.maxPoints + ")")
      }
    };

    function onSuccess(response) {
      pointValidator.incrementPoint();
      nextPoint();

      toastr.success("Ponto marcado com sucesso!");
    };

    function onFail(error) {
      toastr.error("Erro ao marcar o ponto, tente novamente mais tarde")
    };

    function unlockSaving() {
      vm.saving = false;
    };

    function verifyUserAuthentication() {
      if ($auth.isAuthenticated()) {
        vm.authenticating = false;
        vm.periods        = JSON.parse(localStorage["periods"]).periods;

        navbarService.updateAuthState(true);
      } else {
        $state.go("auth");
      }
    };

    function updateNextPoint() {
      vm.point = undefined;

      var now    = new Date("09/24/2016 08:57");
      var hour   = now.getHours();
      var minute = now.getMinutes();

      vm.period = undefined;

      angular.forEach(vm.periods, function (period) {
        if (angular.isDefined(vm.period)) { return; }

        var periodTime   = moment.utc(period.time);
        var periodHour   = periodTime.hour();
        var periodMinute = periodTime.minute();

        if ((hour < periodHour) || ( hour === periodHour && (minute < periodMinute))) {
          vm.period = period;
          updateDisplayedTime(periodTime);
        }
      });
    };

    // Get next point after saving
    function nextPoint() {
      var index = vm.period.index;

      if (index === config.maxPoints) {
        vm.point = undefined;
        return;
      }

      vm.period = undefined;

      angular.forEach(vm.periods, function (period) {
        if (angular.isDefined(vm.period)) { return; }

        if (period.index === index + 1) {
          vm.period = period;
          updateDisplayedTime(moment.utc(period.time));
        }
      });
    };

    function updateDisplayedTime(time) {
      var hour    = time.hour();
      var minutes = time.minute();

      minutes      = minutes === 0                ? "00"       : minutes;
      hour         = hour.toString().length === 1 ? "0" + hour : hour;

      vm.point = hour + ":" + minutes;
    };

    function updateConnectionStatus(event, isConnected) {
      vm.connected = isConnected;
    };
  };
})();
