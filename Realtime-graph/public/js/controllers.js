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
  controller('MyCtrl1', function ($scope,PushData,socketio) {

  $scope.resourcedata = PushData.query();
  //$scope.data = [1,2,3,4,5];

  console.log($scope.resourcedata);
var a = 5;


  socketio.on('datainput', function (msg) {
    //console.log(msg);
    //$scope.resourcedata[0].data[0].push(msg.data[0]);
    //$scope.resourcedata[0].data[1].push(msg.data[1]);
    //$scope.resourcedata[0].labels.push(msg.labels);
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

    });
