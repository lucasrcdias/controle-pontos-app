(function() {
  angular
    .module("app.services")
    .factory("pointService", pointService);

  pointService.$inject = ["$q", "$http", "$cordovaGeolocation", "config"];

  function pointService($q, $http, $cordovaGeolocation, config) {
    var service = {
      savePoint: savePoint
    };

    return service;

    function savePoint(period) {
      var options = { timeout: 10000, enableHighAccuracy: true };
      var point   = {
        'kind': period.index
      };

      return $cordovaGeolocation.getCurrentPosition(options)
        .then(onSuccess, onFail);

      function onSuccess(position) {
        point.latitude  = position.coords.latitude;
        point.longitude = position.coords.longitude;

        return $http.post(config.apiBase + "/points", { 'point': point })
          .then(pointSaved)
          .catch(onFail);
      }
    }

    function pointSaved(response) {
      return response;
    };

    function onFail(error) {
      return $q.reject(error);
    };
  };
})();
