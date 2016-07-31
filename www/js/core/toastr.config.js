(function() {
  angular
    .module("app.core")
    .config(toastrConfiguration);

  toastrConfiguration.$inject = ["toastrConfig"];

  function toastrConfiguration(toastrConfig) {
    angular.extend(toastrConfig, {
      positionClass: "toast-bottom-center",
      allowHtml: true,
      closeButton: true,
      closeHtml: '<button>&times;</button>',
      templates: {
        toast: "js/directives/toast/toast.html"
      },
      preventOpenDuplicates: true
    });
  };
})();
