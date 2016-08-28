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
      getPeriod()
        .then(updateUserPeriod);

      function updateUserPeriod(response) {
        var period = response.data.period;

        localStorage["start_at"]        = period.start_at;
        localStorage["finish_at"]       = period.finish_at;
        localStorage["interval_start"]  = period.interval_start;
        localStorage["interval_finish"] = period.interval_finish;
      };
    };

    function getPeriod() {
      return $http.get(config.apiBase + "/periods")
        .then(onSuccess)
        .catch(onFail);
    };

    function onSuccess(response) {
      return response;
    };

    function onFail(error) {
      return $q.reject(error);
    };
  };
})();
