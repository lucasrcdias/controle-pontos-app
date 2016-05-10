(function() {
  angular.module('imperium').controller('AuthCtrl', ['$scope', '$timeout', AuthCtrl]);

  function AuthCtrl($scope, $timeout) {
    $scope.user           = {};
    $scope.emailRegex     = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    $scope.authenticating = false;

    $scope.authUser = function (user) {
      $scope.authenticating = true;
      console.log(user);

      $timeout(function() {
        $scope.authenticating = false;
      }, 3000);
    }
  };

  // User object sample
  // user = {
  //   email: 'john@doe.com',
  //   password: 'secret',
  //   errors: {
  //     email: "Usuário não encontrado",
  //     password: "Senha inválida"
  //   }
  // }
})();
