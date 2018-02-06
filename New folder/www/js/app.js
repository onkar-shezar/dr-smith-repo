// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('drsmith', [
  'ionic',
  'drsmith.controllers'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(false);
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider)
{
  $ionicConfigProvider.tabs.position('top');
  $stateProvider

  //SIDE MENU ROUTES
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/sidemenu.html",
    controller: 'sideMenuCtrl'
  })

  // home page
  .state('app.home', {
    url: '/home',
    views: {
      'tab-home':{
        templateUrl: 'templates/home.html',
        controller: 'HomeTabCtrl'
      }
    }   
  })

  // goals page
  .state('app.goals', {
    url: '/goals',
    views: {
      'tab-goals':{
        templateUrl: 'templates/goals.html',
        controller: 'goalsctrl'
      }
    } 
  })

  // forum page
  .state('app.forum', {
    url: '/forum',
    views: {
      'tab-forum':{
        templateUrl: 'templates/forum.html',
      //  controller: 'goalsctrl'
      }
    } 
    
  })
  //login page
  .state('login', {
    url: "/login",
    views: {
      '': {
        templateUrl: "templates/login.html",
        controller:'loginctrl'
      }
    }
  })
  //state for mentee login
  .state('app.mentee_home', {
    url: "/mentee_home",
    views: {
      'tab-home': {
        templateUrl: "templates/mentee_home.html",
        controller:'mentee_homectrl'
      }
    }
  })
  //state for mentee login and functionality-->mentee goals and adding goals
  .state('app.mentee_goals',{
    url:'/mentee_goals/:mentee_id',
    views:{
      'tab-home':{
        templateUrl:"templates/mentee_goals.html",
        controller:"mentee_homectrl"
      }
    }
  })
  //state for mentee login functionality --->display comments on goals written by mentee and mentor and add comment
  .state('app.goal_comments',{
    url:'/goal_comments/:goal_id',
    views:{
      'tab-home':{
        templateUrl:"templates/goal_comments.html",
        controller:"mentee_homectrl"
      }
    }
  })
    //state for mentee login functionality ---> display tasks given by mentor
  .state('app.mentee_tasks',{
    url:'/mentee_tasks',
    views:{
      'tab-home':{
        templateUrl:"templates/mentee_tasks.html",
        controller:"mentee_homectrl"
      }
    }
  })
 // state for mentee login functionality --->display comments on tasks written by mentor and mentee add comment
  .state('app.mentee_task_comments',{
    url:'/mentee_task_comments/:id',
    views:{
      'tab-home':{
        templateUrl:"templates/mentee_task_comments.html",
        controller:"commentsctrl"
      }
    }
  })
  .state('app.mentee_interactions',{
    url:'/mentee_interactions',
    views:{
      'tab-home':{
        templateUrl:"templates/mentee_interactions.html",
        controller:"mentee_homectrl"
      }
    }
  })

  .state('app.mentee', {
    url: "/mentee/:id",
    views: {
      'tab-home': {
        templateUrl: "templates/mentee.html",
        controller: 'menteectrl'
      }
    }
  })
  .state('app.menteegoals_comments', {
    url: "/menteegoals_comments/:id/:mentee_id",
    views: {
      'tab-home': {
        templateUrl: "templates/menteegoals_comments.html",
        controller: 'commentsctrl'
      }
    }
  })
  .state('app.menteetask_comments', {
    url: "/menteetask_comments/:id",
    views: {
      'tab-home': {
        templateUrl: "templates/menteetask_comments.html",
        controller: 'commentsctrl'
      }
    }
  })
  .state('app.interactions',{
    url:'/interactions/:mentee_id',
    views: {
      'tab-home': {
        templateUrl:'templates/interactions.html',
        controller:'menteectrl'
      }
    }
  })
  .state('app.interaction_comments',{
    url:'/interaction_comments/:interaction_id',
    views:{
      'tab-home':{
        templateUrl:'templates/interaction_comments.html',
        controller: 'commentsctrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/login');
})
