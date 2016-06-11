(function(){

    'use strict';

    angular.module('ipm')

        .controller('DashboardController', DashboardController);


    function DashboardController($scope,$http,BootsrapService,RestfulAPI){

         var login = RestfulAPI.checkLogin();
        console.log("started");
        $scope.mainTable = [];

        $scope.series = ['Registered', 'Paid'];
        $http.get(RestfulAPI.services.dashboardReg).success(function(data){
            $scope.labels = [];
            $scope.data = [];
            $scope.data.push([]);
            $scope.data.push([]);

            $scope.mainTable = data.data;
            console.log("reg graph",data);

            data.data.map(function(item,key){

                $scope.labels.push(item.name);

                $scope.data[0].push(item.registered);
                $scope.data[1].push(item.paid);

            });

        });



        $scope.labels1 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data1= [300, 500, 100];













    }




})();