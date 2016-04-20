'use strict';

/**
 * @ngdoc function
 * @name jschallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jschallengeApp
 */


app.controller('MapCtrl', function($scope, $rootScope, $http, NgMap) {

  // Query for a booking in 1 day from now, for 2 hours.
  var start = Date.now() + 24 * 3600 * 1000;
  var end = start + 2 * 3600 * 1000;
  var url = 'http://jschallenge.smove.sg/provider/1/availability?book_start=' + start + '&book_end=' + end;

  // Singapore Lat and Lon values
  $scope.centralLat = "1.290270";
  $scope.centralLon = "103.851959";

  $http.get(url).success(function(result) {
    console.log('Result from the API call:', result);
    $rootScope.result = result;
  }).error(function(err) {
    // Hum, this is odd ... contact us...
    console.error(err);
  });

  NgMap.getMap().then(function(map) {
      $scope.map = map;
  });

  $scope.showMapDetail = function(event, d) {
    $scope.location = d;
    console.log(d.id);
    $scope.map.showInfoWindow('fullMapInfo', 'id_'+d.id);
  }


});

app.directive("fullInfo", function($compile) {
    return{
        link: function(scope, element){
            var template = "<p>{{location.parking_name}}</P>";
            var linkFn = $compile(template);
            var content = linkFn(scope);
            element.append(content);
        }
    }
});