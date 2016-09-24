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
      debugger;
      var today       = new Date();
      var lastDate    = new Date(localStorage["last_date"]);
      var pointsCount = parseInt(localStorage["points_count"]);

      today.setHours(0, 0, 0, 0);
      lastDate.setHours(0, 0, 0, 0);

      if (today > lastDate) {
        pointsCount = 0;

        localStorage["last_date"]    = today;
        localStorage["points_count"] = 0;
      }

      return pointsCount < config.maxPoints;
    };

    function incrementPoint(amount) {
      amount = amount ? amount : 1;

      localStorage["points_count"] = parseInt(localStorage["points_count"]) + amount;

      return localStorage["points_count"];
    };
  };
})();
