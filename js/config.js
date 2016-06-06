(function(){
    
    
    'use strict';
    function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "pages/dashboard.html",
            controller: "DashboardController as dc"
          
    }).state('participants', {
            url: "/participants",
            templateUrl: "pages/participants.html",
            controller: "ParticipantController as pc"
          
    })
    .state('speakers', {
            url: "/speakers",
            templateUrl: "pages/speakers.html",
            controller: "SpeakerController as sp"
          
    })
    .state('agenda', {
            url: "/agenda",
            templateUrl: "pages/agenda.html",
            controller: "AgendaController as ac"
          
    });
}
angular
    .module('ipm')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
    
    
})();

