(function() {
  angular
    .module("app.controllers")
    .controller("pointCtrl", pointCtrl);

  pointCtrl.$inject = ["navbarService", "pointService", "periodService", "pointValidator", "$auth", "$state", "$rootScope", "toastr", "config", "moment"];

  function pointCtrl(navbarService, pointService, periodService, pointValidator, $auth, $state, $rootScope, toastr, config, moment) {
    var vm = this;

    vm.saving         = false;
    vm.periods        = undefined;
    vm.connected      = navigator.connection.type !== "none";
    vm.authenticating = true;

    vm.setPoint = setPoint;

    loadScreenData();

    $rootScope.$on("networkChanged", updateConnectionStatus);

    function setPoint() {
      if (vm.saving) { return; }

      if (pointValidator.validateMaximumPoints()) {
        vm.saving = true;

        return pointService.savePoint(vm.period)
          .then(onSuccess)
          .catch(onFail)
          .finally(unlockSaving);

      } else {
        toastr.error("O limite de marcações diárias já foi atingido (" + config.maxPoints + ")")
      }
    };

    function onSuccess(response) {
      pointValidator.incrementPoint();
      getNextPoint();

      toastr.success("Ponto marcado com sucesso!");
    };

    function onFail(error) {
      toastr.error("Erro ao marcar o ponto, tente novamente mais tarde")
    };

    function unlockSaving() {
      vm.saving = false;
    };

    function loadScreenData() {
      if ($auth.isAuthenticated()) {
        // Updates user period on start
        periodService.storeUserPeriod()
          .then(function(response) {
            vm.periods = response.periods;
          })
          .catch(function(error) {
            vm.periods = periodService.retrieveUserPeriod();
          })
          .finally(loadCurrentPoint);

        vm.authenticating = false;
        navbarService.updateAuthState(true);
      } else {
        $state.go("auth");
      }
    };

    function loadCurrentPoint() {
      // Return if user already saved all daily points
      if (!pointValidator.validateMaximumPoints()) { return; }

      var index = localStorage["points_count"] ? parseInt(localStorage["points_count"]) : 0;

      vm.point  = undefined;
      vm.period = undefined;

      getPointByIndex(index);
    };

    function getNextPoint() {
      var index = vm.period.index;

      if (index === config.maxPoints) {
        vm.point = undefined;
        return;
      }

      vm.period = undefined;

      getPointByIndex(index);
    };

    function getPointByIndex(index) {
      if (!vm.periods) { return; }

      angular.forEach(vm.periods, function (period) {
        // Skip if already found the next point
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
