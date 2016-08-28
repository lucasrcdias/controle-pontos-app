(function() {
  angular
    .module('app.core')
    .config($authProvider);

  $authProvider.$inject = ['$authProvider', 'config'];

  function $authProvider($authProvider, config) {
    $authProvider.tokenPrefix = '';
    $authProvider.tokenRoot   = 'user';
    $authProvider.tokenName   = 'jwt_token';

    $authProvider.loginUrl = config.apiBase + '/login';
  };
})();
