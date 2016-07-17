(function() {
  angular
    .module("app.controllers")
    .controller("pointCtrl", pointCtrl);

  pointCtrl.$inject = ["pointService"];

  function pointCtrl(pointService) {
    var vm = this;

    vm.setPoint = setPoint;

    function setPoint() {
      pointService.setPoint()
        .then(onSuccess)
        .catch(onFail);
    };

    function onSuccess(response) {
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
