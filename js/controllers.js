
(function(){

    'use strict';
    angular.module('ipm')
        .controller('MainCtrl', function($scope) {
        this.projectBoldName = 'App';
        this.projectName = 'Name';
        this.userName = 'Example user';
        this.headerText = 'AngularJS Starter Project';
        this.descriptionText = 'Here you can quickly bootstrap your AngularJS project.';

    })
    .service('BootsrapService',function($uibModal){


    var self = this;

    self.modal = function(modalObj){

        var modalInstance =  $uibModal.open({
            animation: true,
            templateUrl: modalObj.url,
            controller: modalObj.controller || '',
            size: modalObj.size || 'lg',
            scope:modalObj.scope || '',
            resolve: modalObj.resolve || {}
            /*{
                items: function (){
                    return $scope.items;
                } 
            } */
        });

        return  modalInstance;

    }



});
})();



