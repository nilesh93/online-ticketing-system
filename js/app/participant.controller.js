(function(){

    'use strict';

    angular.module('ipm')

        .controller('ParticipantController', ParticipantController);


    function ParticipantController($scope,$http,BootsrapService,RestfulAPI,$window){


        var self = this;

        $scope.pay ={};

        $scope.pay.method = "CASH";

        $scope.participants = [];

        $scope.pinfo = function(id){

          
            $scope.saveType = 'company';
            $scope.companyInfo = $scope.participants.comapany[id];
            $scope.pay.method = "CASH";
            $scope.pay.amount = ($scope.participants.comapany[id].paymant_amount == null)?0:$scope.participants.comapany[id].paymant_amount;

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

            $scope.saveType = 'ind';

            $scope.pay.method = "CASH";
            $scope.pay.amount =$scope.participants.individual[id].amount_disply;

            $scope.companyInfo = $scope.participants.individual[id];

            self.modal  =  BootsrapService.modal({
                url:'pages/single-participant.html',
                scope: $scope
            });

        };


        $scope.cInfo = function(id){


            $scope.companyInfo = $scope.participants.comapany[id];

            console.log($scope.participants.comapany[id]);
            $http.get(RestfulAPI.services.IndividualsFromCompany+"?companyId="+$scope.companyInfo.company_id).success(function(data){

                console.log("plist",data);

                $scope.pList = data.data;
            }).error(function(){


            });

            self.modal  =  BootsrapService.modal({
                url:'pages/company-view.html',
                scope: $scope
            });

        };

        $scope.sInfo = function(id){




            $scope.pay.amount =$scope.participants.individual[id].amount_disply;

            $scope.companyInfo = $scope.participants.individual[id];

            self.modal  =  BootsrapService.modal({
                url:'pages/single-view.html',
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

            swal("Saving..", "");



            if(type == 'company'){

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
                    $window.open(data.PDF_file, '_blank');              

                }).error(function(data){

                    swal("Error!", "", "error");
                });
            }else{

                var data = {
                    payment_method : $scope.pay.method,
                    cheque_no : $scope.pay.checkno || "",
                    bank : $scope.pay.bank || "",
                    branch : $scope.pay.branch ||"",
                    amount : $scope.pay.amount,
                    company_id : $scope.companyInfo.participant_company,
                    participant_id :  $scope.companyInfo.participant_id
                };

                var datastring = RestfulAPI.setUrl(data);
                $http.get(RestfulAPI.services.IndividualPayment+datastring).success(function(data){

                    init();
                    $scope.cancel();
                    swal("Saved!", "", "success");
                    $window.open(data.PDF_file, '_blank');


                }).error(function(data){

                    swal("Error!", "", "error");
                });

            }

        };

    }

})();