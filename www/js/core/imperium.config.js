(function() {
  angular
    .module("app.core")
    .constant("config", {
      // 'apiBase': "http://imperium.herokuapp.com/v1"
      "apiBase": "//192.168.0.105:3000/v1",
      "maxPoints": 6
    });
})();
