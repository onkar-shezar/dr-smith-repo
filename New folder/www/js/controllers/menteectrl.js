angular.module('drsmith.controllers.menteectrl', [])
.controller('menteectrl',function($scope,$http,$rootScope,$stateParams,$state){
    console.log("calling...")
    var id=$stateParams.id;
    $http(
      {
          url:$rootScope.url+"/myproject/login_read.php",
          method:"GET",
          params:{id:$rootScope.id}
      }
    )
    .then(function(response){
      $scope.mentees=response.data;
    for(var i=1;i<$scope.mentees.length+1;i++){
          if(id==i){
         $scope.mentee=$scope.mentees[i-1];
         $scope.gettasks(id)

        break;}
    }
    console.log($scope.mentee)

  })
        $scope.addschedules=function(date,stime,ftime,mentee_id){
          console.log(date); console.log(stime); console.log(ftime); console.log(mentee_id); console.log($rootScope.id)
          $http(
            {
              url:$rootScope.url+"/myproject/meeting_schedule.php",
              method:"GET",
              params: {date:date,start_time:stime,end_time:ftime,mentor_id:$rootScope.id,mentee_id:mentee_id,comment:"hey this is imp schedule"}
            }
          )
          .then(function(response){
            $scope.result=response.data;
            console.log($scope.result)
          })
        }
        $scope.getschedules=function(){
          $scope.mentee_id=$stateParams.mentee_id;
          $http(
            {
              url:$rootScope.url+"/myproject/view_meeting_schedule.php",
              method:"GET",
              params:{mentor_id:$rootScope.id,mentee_id:$stateParams.mentee_id}
            })
            .then(function(response){$scope.schedules=response.data;console.log($scope.schedules)})
        }
      $scope.getmenteegoals=function(id){
        $http(
          {
              url:$rootScope.url+"/myproject/mentee-goal.php",
              method:"GET",
              params:{id:id}
          })
          .then(function(response){
            $scope.menteegoals=response.data;
            console.log($scope.menteegoals)
          })};

  // console.log($rootScope.url)
  $scope.gettasks=function(id){
     console.log(id)
    $http(
    {
      url: $rootScope.url+"/myproject/mentee-task.php",
      method:"GET",
      params:{mentor_id:$rootScope.id,id:id}
    })
    .then(function(response){
      $scope.menteetasks=response.data;
      console.log($scope.menteetasks)

    }
  )
}
var base64=null;
var name=null;
$scope.addtask=function(id,task,files){
  console.log(task)
  console.log($rootScope.id)
  console.log(id)
  var selectedfile = document.getElementById("inputFile").files;
  console.log(selectedfile)
  if(selectedfile.length < 1 && task==undefined)
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
        $scope.fun(task);   
    }
}
else
{ 
  $scope.fun(task);
}
}

$scope.fun=function(task){
  console.log(task);
  console.log(id);
  console.log(name);

  $http(
    {
      url:$rootScope.url+"/myproject/add-mentee-task.php",
       method:"POST",
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data:{mentor_id:$rootScope.id,id:id,task:task,name:name,shab:base64}
 })
  .then(function(response){
   $scope.task=response;
  console.log($scope.task)
      $scope.gettasks(id);
      $scope.new_task=null;
    }
  )
  .catch(function(e){
    alert(e)
  })

  document.getElementById("task").value="";
      }

         })