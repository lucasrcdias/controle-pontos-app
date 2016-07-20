(function() {
  angular
    .module("app.controllers")
    .controller("pointCtrl", pointCtrl);

  pointCtrl.$inject = ["pointService", "pointValidator"];

  function pointCtrl(pointService, pointValidator) {
    var vm = this;

    vm.setPoint = setPoint;

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
  };
})();
