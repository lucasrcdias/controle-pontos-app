(function() {
  angular
    .module("app.services")
    .factory("pointService", pointService);

  pointService.$inject = ["$q", "$http", "$cordovaGeolocation"];

  function pointService($q, $http, $cordovaGeolocation) {
    var service = {
      setPoint: setPoint
    };

    return service;

    function setPoint() {
      return getUserPosition();
    };

    function getUserPosition() {
      var options = { timeout: 10000, enableHighAccuracy: true };

      return $cordovaGeolocation.getCurrentPosition(options)
        .then(onSuccess, onFail);

      function onSuccess(position) {
        return position;
      };

      function onFail(error) {
        return error;
      };
    };
  };
})();
