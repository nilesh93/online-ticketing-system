
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



    })
        .service('RestfulAPI',function($state,$rootScope){

        var url = "/ipm-web-services/public/index.php/";
        this.services = {

            dashboardReg : url+"registrationAndPayments",
            IndividualList : url+"IndividualList",
            CompanyPayment : url+"CompanyPayment",
            IndividualsFromCompany : url+"IndividualsFromCompany",
            IndividualPayment : url+"IndividualPayment",
            showAllSpeakers: url+"showAllSpeakers",
            addSpeakers:url+"addSpeakers",
            UpdateSpeakers:url+"UpdateSpeakers",
            deleteSpeaker:url+"deleteSpeaker",
            showAgenda:url+"showAgenda",
            saveAgenda:url+"saveAgenda",
            updateAgenda:url+"updateAgenda",
            deleteAgendaItemByID:url+"deleteAgendaItemByID",
            getusers:url+"getusers",
            register:url+"register",
            editUser:url+"edit",
            deleteUser:url+"deleteUser",
            login:url+"login"
        };

        this.setUrl = function(obj){

             
            console.log(obj);
            var str = "?";
            for (var property in obj) {
                
                if (obj.hasOwnProperty(property)) {

                   
                    obj[property] += "";
                    if(obj[property].trim() != "" )
                        str += property+"="+obj[property]+"&";

                }
            }

            return str;
        };

        
        this.checkLogin = function(){
            
            if($rootScope.loginStatus){
                
                return true;
                
            }else{
                
                $state.go('login');
                
                return false;
            }
        };

    });
})();



