(function(){

    'use strict';

    angular.module('ipm')

        .controller('DashboardController', DashboardController);


    function DashboardController($scope,$http,BootsrapService){

        console.log("started");

        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];

        
          $scope.labels1 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data1= [300, 500, 100];
        
        
        
        
        
        
        
        
       
        
        
        
        
    }


    
 
})();