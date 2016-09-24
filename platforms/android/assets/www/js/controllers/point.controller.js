(function() {
  angular
    .module("app.controllers")
    .controller("pointCtrl", pointCtrl);

  pointCtrl.$inject = ["navbarService", "pointService", "pointValidator", "$auth", "$state", "$rootScope", "toastr", "config"];

  function pointCtrl(navbarService, pointService, pointValidator, $auth, $state, $rootScope, toastr, config) {
    var vm          = this;
    var breakpoints = ["start_at", "interval_start", "interval_finish", "finish_at"];

    vm.saving         = false;
    vm.connected      = navigator.connection.type !== "none";
    vm.authenticating = true;

    vm.setPoint = setPoint;

    verifyUserAuthentication();
    loadNextPoint();

    $rootScope.$on("networkChanged", updateConnectionStatus);

    function setPoint() {
      if (!vm.saving) {
        debugger;
        if (pointValidator.validateMaximumPoints()) {
          vm.saving = true;

          pointService.setPoint()
            .then(onSuccess)
            .catch(onFail)
            .finally(unlockSaving);
        } else {
          toastr.error("O limite de marcações diárias já foi atingido (" + config.maxPoints + ")")
        }
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
        navbarService.updateAuthState(true);
      } else {
        $state.go("auth");
      }
    };

    function loadNextPoint() {
      vm.nextPoint = undefined;

      var now    = new Date("22/09/2016 05:57");
      var hour   = now.getHours();
      var minute = now.getMinutes();

      var breakpoints = ["start_at", "interval_start", "interval_finish", "finish_at"];

      for (breakpoint in breakpoints) {
        var name = breakpoints[breakpoint];

        var time             = new Date(localStorage[name]);
        var breakpointHour   = time.getHours();
        var breakpointMinute = time.getMinutes();

        if ((hour < breakpointHour) || ( hour === breakpointHour && (minute < breakpointMinute))) {
          updateDisplayedTime(time);

          localStorage['breakpoint'] = name;

          break;
        }
      }
    };

    function nextPoint() {
      var index = breakpoints.indexOf(localStorage['breakpoint']) + 1;

      if (index < breakpoints.length) {
        localStorage['breakpoint']      = breakpoints[index];
        localStorage['breakpointIndex'] = index;
        var nextBreakpoint = localStorage[breakpoints[index]];

        updateDisplayedTime(new Date(nextBreakpoint));
      } else {
        vm.nextPoint = undefined;
      }
    };

    function updateDisplayedTime(time) {
      var hour    = time.getHours();
      var minutes = time.getMinutes();

      minutes      = minutes === 0                ? "00"       : minutes;
      hour         = hour.toString().length === 1 ? "0" + hour : hour;

      vm.nextPoint = hour + ":" + minutes;
    };

    function updateConnectionStatus(event, isConnected) {
      vm.connected = isConnected;
    };
  };
})();
