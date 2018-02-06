angular.module('drsmith.controllers.mentee_homectrl', [])
.controller('mentee_homectrl',function($scope,$rootScope,$http,$stateParams){
            $scope.get=function(){
                $http({
                    url:$rootScope.url+"/myproject/mentee_details.php",
                    method:"GET",
                    params:{id:$rootScope.id}
                })
                .then(function(response){
                    $scope.mentee=response.data;
                    console.log($scope.mentee)
                })
            }
            $scope.getgoals=function(){
                // console.log($rootScope.id)
                $http(
                {
                  url:$rootScope.url+"/myproject/mentee-goal.php",
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
            $scope.addgoal=function(goal,files){
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
                  url:$rootScope.url+"/myproject/add_mentee_goal_with_file.php",
                   method:"POST",
                   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  data:{id:$rootScope.id,name:name,goal:goal,shab:base64,mentor_id:$rootScope.mentor_id}
             })
              .then(function(response){
               $scope.goals=response;
            console.log($scope.goals)
                  $scope.getgoals();
                  $scope.new_goal=null;
                }
              )
              .catch(function(e){
                alert(e)
              })
              document.getElementById("goal").value="";
                  }
          $scope.getcomments=function(){
              console.log($rootScope.id)
              console.log($stateParams.goal_id)
            $http({
                url:$rootScope.url+"/myproject/mentee_goals_comment.php",
                method:"GET",
                params:{id:$rootScope.id,mentee_goal_id:$stateParams.goal_id}
            })
            .then(function(response){
               $scope.goal_comments=response.data
               console.log( $scope.goal_comments)
            })
          }
          $scope.addcomment=function(comment){
            console.log($rootScope.id)
            console.log($stateParams.goal_id)
            console.log($rootScope.type)
            console.log(comment)
            $http({
                url:$rootScope.url+"/myproject/add_mentee_goals_comment.php",
                method:"GET",
                params:{commentor_id:$rootScope.id,mentee_goal_id:$stateParams.goal_id,
                comment_by:$rootScope.type,comment_text:comment}
            })
            .then(function(response){
               console.log(response.data)
               $scope.getcomments();
            })

          }
          $scope.gettasks=function(){
           $http(
           {
             url: $rootScope.url+"/myproject/mentee-task.php",
             method:"GET",
             params:{mentor_id:$rootScope.mentor_id,id:$rootScope.id}
           })
           .then(function(response){
             $scope.menteetasks=response.data;
             console.log($scope.menteetasks)
       
           }
         )
       }
       $scope.addschedules=function(date,stime,ftime){
        $http(
          {
            url:$rootScope.url+"/myproject/meeting_schedule.php",
            method:"GET",
            params: {date:date,start_time:stime,end_time:ftime,mentor_id:$rootScope.mentor_id,
              mentee_id:$rootScope.id,comment:"hey this is imp schedule"}
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
            params:{mentor_id:$rootScope.mentor_id,mentee_id:$rootScope.id}
          })
          .then(function(response){$scope.schedules=response.data;console.log($scope.schedules)})
      }
       
})
