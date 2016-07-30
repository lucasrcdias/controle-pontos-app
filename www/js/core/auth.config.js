(function() {
  angular
    .module('app.core')
    .config($authProvider);

  $authProvider.$inject = ['$authProvider', 'envServiceProvider'];

  function $authProvider($authProvider, envServiceProvider) {
    var envService = envServiceProvider.$get();
    var apiURL = envService.read("apiURL");

    $authProvider.tokenPrefix = '';
    $authProvider.tokenRoot   = 'user';
    $authProvider.tokenName   = 'jwt_token';

    $authProvider.loginUrl = apiURL + '/login';
  };
})();
