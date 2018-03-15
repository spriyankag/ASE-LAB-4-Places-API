angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider 

    .state('tabsController.quiz', {
      url: '/page4',
      views: {
        'tab1': {
          templateUrl: 'templates/quiz.html',
        }
      }
    })

        
    .state('tabsController.add', {
      url: '/page3',
      views: {
        'tab2': {
          templateUrl: 'templates/add.html',
        }
      }
    })

        
    .state('tabsController.list', {
      url: '/page2',
      views: {
        'tab3': {
          templateUrl: 'templates/list.html',
        }
      }
    })
      
        
    .state('tabsController', {
      url: '/page1',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })  
    ;

 $urlRouterProvider.otherwise('/page1/page3');

});