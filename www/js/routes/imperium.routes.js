(function() {
  angular
  .module('app.routes')
  .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  };

  function getStates() {
    return [
      {
        state: 'point',
        config: {
          url: '/',
          templateUrl: 'point.html',
          controller: 'pointCtrl',
          controllerAs: 'vm'
        }
      },
      {
        state: 'auth',
        config: {
          url: '/auth',
          templateUrl: 'auth.html',
          controller: 'authCtrl',
          controllerAs: 'vm'
        }
      }
    ];
  };
})();
