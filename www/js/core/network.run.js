(function() {
  angular
    .module("app.core")
    .run(function($rootScope) {
      document.addEventListener("offline", networkChanged, false);
      document.addEventListener("online",  networkChanged, false);

      networkChanged();

      function networkChanged() {
        $rootScope.$emit("networkChanged", navigator.connection.type !== "none");
      };
    });
})();
