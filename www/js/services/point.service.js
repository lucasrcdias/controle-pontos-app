(function() {
  angular
    .module("app.services")
    .factory("pointService", pointService);

  pointService.$inject = ["$q", "$http", "$cordovaGeolocation", "envService"];

  function pointService($q, $http, $cordovaGeolocation, envService) {
    var apiBase = envService.read("apiURL");
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
        return savePoint(position);
      };

      function onFail(error) {
        return error;
      };
    };

    function savePoint(position) {
      var point = {
        'latitude': position.coords.latitude,
        'longitude': position.coords.longitude
      };

      return $http.post(apiBase + "/points", { 'point': point })
        .then(onSuccess)
        .catch(onFail);

      function onSuccess(response) {
        return response;
      };

      function onFail(error) {
        return $q.reject(error);
      };
    };
  };
})();
