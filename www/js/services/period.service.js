(function() {
  angular
    .module("app.services")
    .factory("periodService", periodService);

  periodService.$inject = ["$q", "$http", "config"];

  function periodService($q, $http, config) {
    var service = {
      storeUserPeriod: storeUserPeriod,
      retrieveUserPeriod: retrieveUserPeriod
    };

    return service;

    function retrieveUserPeriod() {
      if (localStorage["periods"]) {
        return JSON.parse(localStorage["periods"]).periods;
      }

      return storeUserPeriod();
    };

    function storeUserPeriod() {
      return $http.get(config.apiBase + "/periods")
        .then(onSuccess)
        .catch(onFail);
    };

    function onSuccess(response) {
      localStorage["periods"] = JSON.stringify(response.data.period);
      return response.periods;
    };

    function onFail(error) {
      return $q.reject(error);
    };
  };
})();
