(function() {
  angular
    .module("app.core")
    .run(function($rootScope) {
      document.addEventListener("offline", networkChanged, false);
      document.addEventListener("online",  networkChanged, false);

      networkChanged();

      function networkChanged() {
        console.log("changed...");
        console.log(navigator.connection.type);
        $rootScope.$emit("networkChanged", navigator.connection.type !== "none");
      };
    });
})();
