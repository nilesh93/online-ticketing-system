(function(){

    'use strict';

    angular.module('ipm')

        .controller('SpeakerController', SpeakerController);


    function SpeakerController($scope,$http,BootsrapService){


        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        
        
            $scope.pinfo = function(){
        
          self.policeModalInstance  =  BootsrapService.modal({
                    url:'pages/speaker-modal.html',
                    scope: $scope
                });
    
    };
    }

})();