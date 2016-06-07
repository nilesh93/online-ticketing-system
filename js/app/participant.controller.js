(function(){

    'use strict';

    angular.module('ipm')

        .controller('ParticipantController', ParticipantController);


    function ParticipantController($scope,$http,BootsrapService,RestfulAPI){


        var self = this;

        $scope.pay ={};

        $scope.pay.method = "CASH";

        $scope.participants = [];

        $scope.pinfo = function(id){


            $scope.companyInfo = $scope.participants.comapany[id];
            $scope.pay.method = "CASH";

            $http.get(RestfulAPI.services.IndividualsFromCompany+"?companyId="+$scope.companyInfo.company_id).success(function(data){

                console.log("plist",data);

                $scope.pList = data.data;
            }).error(function(){


            });

            self.modal  =  BootsrapService.modal({
                url:'pages/participant-modal.html',
                scope: $scope
            });
        };

        $scope.single = function(id){

            $scope.pay.method = "CASH";

            $scope.companyInfo = $scope.participants.individual[id];

            self.modal  =  BootsrapService.modal({
                url:'pages/single-participant.html',
                scope: $scope
            });

        };


        $scope.cancel = function () {

            self.modal.dismiss('cancel');
        };


        function init(){
            $http.get(RestfulAPI.services.IndividualList).success(function(data){

                $scope.participants = data;
                console.log("data",data);

            }).error(function(){


            });
        }
        init();


        $scope.savePayment = function(type){

            swal("Saving..", "")

            var data = {

                payment_method : $scope.pay.method,
                cheque_no : $scope.pay.checkno || "",
                bank : $scope.pay.bank || "",
                branch : $scope.pay.branch ||"",
                amount : $scope.pay.amount,
                company_id : $scope.companyInfo.company_id,
                count : $scope.companyInfo.user_count
            };

            var datastring = RestfulAPI.setUrl(data);
            $http.get(RestfulAPI.services.CompanyPayment+datastring).success(function(data){

                init();
                $scope.cancel();
                swal("Saved!", "", "success");
          

            }).error(function(data){

                swal("Error!", "", "error");
            });

        };

    }

})();