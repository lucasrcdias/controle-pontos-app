(function() {
  angular
    .module("app.directives")
    .directive("imNavbar", imNavbar);

  function imNavbar() {
    var directive = {
      restrict: "E",
      templateUrl: "navbar.html"
    };

    return directive;
  };
})();
