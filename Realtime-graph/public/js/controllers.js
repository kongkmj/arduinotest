'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).

  controller('googlemaps',function ($scope,$location) {
      console.log('googlemaps');

  }).

  controller('MyCtrl1', function ($scope,PushData,socketio) {

    $scope.resourcedata = PushData.query();

    console.log($scope.resourcedata);
    var a = 5;


    socketio.on('datainput', function (msg) {

      if($scope.resourcedata[0].labels.length==10)
      {
        $scope.resourcedata[0].labels=$scope.resourcedata[0].labels.slice(1);
        $scope.resourcedata[0].labels.push(a.toString());
        a++;
      }
      else {
        $scope.resourcedata[0].labels.push(a.toString());
        a++;
      }

      if($scope.resourcedata[0].data[0].length==10)
      {
        $scope.resourcedata[0].data[0]=$scope.resourcedata[0].data[0].slice(1);
        $scope.resourcedata[0].data[0].push(msg.data[0]);
      }
      else {
        $scope.resourcedata[0].data[0].push(msg.data[0]);
      }

    });
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

  }).
controller('inputCtrl', function ($scope, $location, PushData) {
      'use strict';

      $scope.save = function (Data) {
        console.log(Data);
        PushData.save(Data);
      };


      $scope.cancel = function () {
        $location.path('/');
      };

    }).
controller('termCtrl', function ($scope,socket) {
  'use strict';

  io.on('connection', function (socket) {
    //chat message 이벤트 발생
    socket.on('chat message',function(msg){
      //public 통신
      io.emit('chat message',msg);
    });
  });

});