(function() {
  angular
    .module("app.services")
    .factory("pointValidator", pointValidator);

  pointValidator.$inject = ["config"];

  function pointValidator(config) {
    var service = {
      validateMaximumPoints: validateMaximumPoints,
      incrementPoint: incrementPoint
    };

    return service;

    function validateMaximumPoints() {
      var today       = new Date();
      var lastDate    = localStorage["last_date"]    ? new Date(localStorage["last_date"])    : new Date(getYesterday());
      var pointsCount = localStorage["points_count"] ? parseInt(localStorage["points_count"]) : 0;

      today.setHours(0, 0, 0, 0);
      lastDate.setHours(0, 0, 0, 0);

      if (today > lastDate) {
        pointsCount = 0;

        localStorage["last_date"]    = today;
        localStorage["points_count"] = pointsCount;
      }

      return pointsCount < config.maxPoints;
    };

    function incrementPoint(amount) {
      amount    = amount                       ? amount                                 : 1;
      var count = localStorage["points_count"] ? parseInt(localStorage["points_count"]) : 0;

      localStorage["points_count"] = count + amount;

      return localStorage["points_count"];
    };

    function getYesterday() {
      var date = new Date();

      return date.setDate(date.getDate() - 1);
    };
  };
})();
