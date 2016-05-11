(function() {
  angular.module('imperium').controller('HomeCtrl', ['$scope', '$timeout', HomeCtrl]);

  function HomeCtrl($scope, $timeout) {
    $scope.nextPointTime = "17:30";
    $scope.actionStatus  = "waiting";
    $scope.actionIcons   = {
      "waiting": "fa-plus",
      "loading": "fa-circle-o-notch fa-spin",
      "done":    "fa-check"
    }

    $scope.savePoint = function () {
      $scope.actionStatus = "loading";

      $timeout(function() {
        $scope.actionStatus = "done";
      }, 1500);
    };
  };
})();
