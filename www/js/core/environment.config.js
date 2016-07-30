(function() {
  angular
    .module('app.core')
    .config(environmentProvider);

    environmentProvider.$inject = ['envServiceProvider'];

    function environmentProvider(envServiceProvider) {
      envServiceProvider.config({
        domains: {
          development: ['localhost'],
          staging:     ['staging.imperium.co'],
          production:  ['imperium.com']
        },

        vars: {
          development: {
            apiURL: '//localhost:3000/v1',
            baseURL: '//localhost:3000'
          },
          staging: {
            apiURL: '//staging.imperium.co/v1',
            baseURL: '//staging.imperium.co'
          },
          production: {
            apiURL: '//imperium.com/api/v1',
            baseURL: '//imperium.com'
          }
        }
      });

      envServiceProvider.check();
    }
})();
