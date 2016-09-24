(function() {
  angular
    .module("app.services")
    .factory("periodService", periodService);

  periodService.$inject = ["$q", "$http", "config"];

  function periodService($q, $http, config) {
    var service = {
      loadPeriod: loadPeriod
    };

    return service;

    function loadPeriod() {
      return $http.get(config.apiBase + "/periods")
        .then(onSuccess)
        .catch(onFail);
    };

    function onSuccess(response) {
      localStorage["periods"] = JSON.stringify(response.data.period);
      return response;
    };

    function onFail(error) {
      return $q.reject(error);
    };
  };
})();
