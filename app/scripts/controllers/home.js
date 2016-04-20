'use strict';



app.controller('HomeCtrl', function($scope, $rootScope,  $http, $controller, ngDialog, NgMap) {
    //Query for a booking in 1 day from now, for 2 hours.
	  var start = Date.now() + 24 * 3600 * 1000;
	  var end = start + 2 * 3600 * 1000;
	  var url = 'http://jschallenge.smove.sg/provider/1/availability?book_start=' + start + '&book_end=' + end;
	  $scope.sortKey = 'id';

      // Singapore Lat and Lon values
      $scope.centralLat = "1.290270";
      $scope.centralLon = "103.851959"

	  $http.get(url).success(function(result) {
	       $scope.result = result;
	  }).error(function(err) {
	    console.error(err);
	  });

	  $scope.sort = function(keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    // get More details
    $scope.showMoreDetails = function(x) {
    	$scope.selectedItem  = x;
        ngDialog.open({ 
        	template: 'views/details.html', 
        	className: 'ngdialog-theme-default',
        	scope: $scope
    	});
    };

    $scope.showLocation = function(x) {
        $scope.centralLat = x.latitude;
        $scope.centralLon = x.longitude;
        $scope.selectedLocation = x;
    };

    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });

});

app.directive("mapInfo", function($compile) {
    return{
        link: function(scope, element){
            var template = "<p><b>Location : </b> {{selectedLocation.parking_name}}</P>";
            var linkFn = $compile(template);
            var content = linkFn(scope);
            element.append(content);
        }
    }
});

