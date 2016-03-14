'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');


angular.module('realtimeData2.data', ['ngResource']).factory('PushData', ['$resource', function($resource) {
  'use strict';


  var server = $resource('/pushdata');

  return {
    save: function (Data) {
      server.save(Data);
    },

    query: function () {
      return server.query();
    }
  };
}]);
