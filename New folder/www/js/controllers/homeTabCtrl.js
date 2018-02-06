angular.module('drsmith.controllers.homeTabCtrl', [])
.controller('HomeTabCtrl', function($scope,$rootScope,$http) {  
  console.log($rootScope.url)
    $http(
      {
          url:$rootScope.url+"/myproject/login_read.php",
          method:"GET",
          params:{id:$rootScope.id}
      }
    )
    .then(function(response){
      $scope.mentees=response.data;
       console.log(response)
      console.log($scope.mentees)
  
    });
  })