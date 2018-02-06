angular.module('drsmith.controllers.commentsctrl', [])
.controller("commentsctrl",function($scope,$http,$rootScope,$stateParams){
    $scope.comment="";
    $scope.getintercomments=function(){
      $http(
        {
          url:$rootScope.url+"/myproject/view_meeting_schedule_comment.php",
          method:"GET",
          params:{schedule_id:$stateParams.interaction_id}
        }
      )
      .then(function(response){
        $scope.intercomments=response.data;
        console.log($scope.intercomments) ;
        $scope.comment="";
      })
    }
    $scope.addintercomment=function(comment){
      console.log($stateParams.interaction_id)
      console.log($rootScope.id)
      console.log($rootScope.type)
      console.log(comment)
      $http(
        {
          url:$rootScope.url+"/myproject/meeting_schedule_comment.php",
          method:"GET",
         params:{schedule_id:$stateParams.interaction_id,commentor_id:$rootScope.id,
                  comment_by:$rootScope.type,comment_text:comment}
        }
      )
      .then(function(response){
        $scope.newcomments=response.data;
        console.log($scope.newcomments);
        $scope.getintercomments();
        
      })
     
     }
     //function for mentor will get the comments on goals
   $scope.getcomments=function(){
    $http(
      {
        url:$rootScope.url+"/myproject/mentee_goals_comment.php",
        method:"GET",
        params:{id:$rootScope.id,mentee_goal_id:$stateParams.id}
      }
    )
    .then(function(response){
      $scope.comments=response.data;
      console.log($scope.comments)
  
      $scope.comment="";
      
    })
   }
    //function for mentor will add the comments on goals
   $scope.addcomment=function(comment){
     console.log($stateParams.id)
     console.log($rootScope.id)
     console.log(comment)
     console.log($rootScope.type)
    $http(
      {
        url:$rootScope.url+"/myproject/add_mentee_goals_comment.php",
        method:"GET",
       params:{mentee_goal_id:$stateParams.id,comment_text:comment,commentor_id:$rootScope.id,comment_by:$rootScope.type}
      }
    )
    .then(function(response){
      $scope.newcomments=response.data;
      console.log($scope.newcomments);
  
      $scope.getcomments();
    })
    $scope.comment="";
   }
    //function for mentor and mentee will get the comments on tasks
   $scope.getcomments_on_task=function(){

    $http({
      url:$rootScope.url+"/myproject/mentee_task_comment.php",
      method:"GET",
      params:{mentee_task_id:$stateParams.id}
    })
    .then(function(response){
      $scope.task_comments=response.data;
      console.log($scope.task_comments)
    })
  }
  //function for mentor and mentee will add the comments on tasks
  $scope.addcomment_on_task=function(comment){
    console.log($stateParams.id)
    console.log($rootScope.id)
    console.log(comment)
    console.log($rootScope.type)
   $http(
     {
       url:$rootScope.url+"/myproject/add_mentee_task_comment.php",
       method:"GET",
      params:{mentee_task_id:$stateParams.id,comment_text:comment,commentor_id:$rootScope.id,comment_by:$rootScope.type}
     }
   )
   .then(function(response){
     $scope.newcomments=response.data;
     console.log($scope.newcomments);
 
     $scope.getcomments_on_task();
   })
   $scope.comment="";
  }
  })