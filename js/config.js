(function(){


    'use strict';
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        $stateProvider
            .state('dashboard', {
            url: "/dashboard",
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
            .state('users', {
            url: "/users",
            templateUrl: "pages/users.html",
            controller: "UserController as us"

        })
           .state('login', {
            url: "/login",
            templateUrl: "pages/login.html",
            controller: "LoginController as lc"

        })
            .state('attendance', {
            url: "/login",
            templateUrl: "pages/attendance.html",
            controller: "AttendanceController as lc"

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
 
       $rootScope.loginStatus = false;
        $rootScope.userInfo = {};
        $rootScope.userInfo.permissions = {};
    });


})();

