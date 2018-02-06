angular.module('drsmith.controllers.goalsTabCtrl', [])
.controller('goalsctrl',function($scope,$rootScope,$http)
{
  // console.log($rootScope.url)
  $scope.get=function(){
    // console.log($rootScope.id)
    $http(
    {
      url:$rootScope.url+"/myproject/mentor-goal1.php",
      method:"GET",
      params:{id:$rootScope.id}
    })
    .then(function(response){
      $scope.goals=response.data;
      console.log($scope.goals)

    }
  )
}
var base64=null;
var name=null;
$scope.add=function(goal,files){
  console.log(goal)
 
  console.log($rootScope.id)
  var selectedfile = document.getElementById("inputFile").files;
  console.log(selectedfile)
  if(selectedfile.length < 1 && goal==undefined)
  {
    // pop up
   alert("selelct value");
  }
  else if(selectedfile.length>0){
       
  name = selectedfile[0].name;
    var filetoload=selectedfile[0];
    alert(selectedfile[0].name, "calling...")
    var fileReader= new FileReader();
    alert(fileReader)
    fileReader.readAsDataURL(filetoload);
    fileReader.onload=function(fileLoadedEvent){
      base64=fileLoadedEvent.target.result;
      $scope.fun(goal);   
    }
}
else
{ 
  $scope.fun(goal);
}
}

$scope.fun=function(goal){
  console.log(goal);
  $http(
    {
      url:$rootScope.url+"/myproject/add_mentor_goal_with_file.php",
       method:"POST",
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:{id:$rootScope.id,name:name,goal:goal,shab:base64}
 })
  .then(function(response){
   $scope.goals=response;
  console.log($scope.goals)
      $scope.get();
      $scope.new_goal=null;
    }
  )
  .catch(function(e){
    alert(e)
  })
  document.getElementById("goal").value="";
      }
})