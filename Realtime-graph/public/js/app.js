'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.services',
  'myApp.filters',
  'myApp.directives',
  'chart.js',
  'realtimeData2.data'
]
)

    .filter('reverse', function () {
      'use strict';

      return function (items) {
        return items.slice().reverse();
      };
    })
.config(function ($routeProvider, $locationProvider) {
  $routeProvider.

      when('/inputdata', {
          controller: 'inputCtrl',
          templateUrl: 'partials/pushdata.html'
      })
      .otherwise({
        redirectTo: '/'
      })
      .when('/graph', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    });

  $locationProvider.html5Mode(true);
})
.factory('socketio', function ($rootScope) {
  'use strict';
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
});
