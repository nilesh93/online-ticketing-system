(function(){

    'use strict';

    angular.module('ipm')

        .controller('ParticipantController', ParticipantController);


    function ParticipantController($scope,$http,BootsrapService){


        var self = this;
        
        $scope.pinfo = function(){

            self.modal  =  BootsrapService.modal({
                url:'pages/participant-modal.html',
                scope: $scope
            });

        };

        $scope.single = function(){

            self.modal  =  BootsrapService.modal({
                url:'pages/single-participant.html',
                scope: $scope
            });

        };
        
        
        $scope.cancel = function () {

             self.modal.dismiss('cancel');

             
        };

    }

})();