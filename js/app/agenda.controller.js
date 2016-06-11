(function(){

    'use strict';

    angular.module('ipm')

        .controller('AgendaController', AgendaController);


    function AgendaController($scope,$http,BootsrapService,RestfulAPI,$rootScope){

      var login = RestfulAPI.checkLogin();
     
        function init(){
            
            
            
            $http.get(RestfulAPI.services.showAgenda).success(function(data){

                console.log("data",data);

                $scope.agendaList = data.data;

            }).error(function(){


            });
        }

        init();

        $http.get(RestfulAPI.services.showAllSpeakers).success(function(data){

            console.log("data",data);
            $scope.speakerList = data.data;

        }).error(function(){


        });

        $scope.cancel = function () {

            self.modal.dismiss('cancel');


        };

        $scope.flag = "save";

        $scope.pinfo = function(){

            self.modal  =  BootsrapService.modal({
                url:'pages/insert-agenda.html',
                scope: $scope
            });

        };
        
        
         $scope.edit = function(index,parent){

            $scope.flag = "edit";
 
            $scope.pinfo();
             console.log("index" ,index);
             console.log("parent" ,parent);
             
             $scope.agenda.name  =  $scope.agendaList[parent].data[index].item_name;
             $scope.agenda.desc  = $scope.agendaList[parent].data[index].item_description;
             $scope.agenda.time  = $scope.agendaList[parent].data[index].item_time;
             $scope.agenda.date  = $scope.agendaList[parent].data[index].item_date_occurs;
             $scope.agenda.speaker   = $scope.agendaList[index].speaker_id;
             $scope.agenda.id = $scope.agendaList[parent].data[index].id;
             
             console.log($scope.agenda);
             console.log($scope.agendaList[index]);


        };


        $scope.agenda = {};
        $scope.save = function(){

            if($scope.flag == "save"){
                swal("Saving..", "");

                var data = {
                    name  : $scope.agenda.name || "",
                    desc : $scope.agenda.desc|| "",
                    time : $scope.agenda.time|| "00:00:00",
                    dateOccurs : $scope.agenda.date|| "",
                    speaker : $scope.agenda.speaker|| ""
                };
                
                console.log(data);

                var datastring = RestfulAPI.setUrl(data);

                $http.get(RestfulAPI.services.saveAgenda+encodeURI(datastring)).success(function()        {

                    init();
                    $scope.cancel();
                    swal("Saved!", "", "success");

                }).error(function(){

                    swal("Error!", "", "error");
                });
            }else{
                swal("Updating..", "");

                 var data = {
                    name  : $scope.agenda.name || "",
                    desc : $scope.agenda.desc|| "",
                    time : $scope.agenda.time|| "00:00:00",
                    dateOccurs : $scope.agenda.date|| "",
                    speaker : $scope.agenda.speaker|| "",
                    id : $scope.agenda.id
                };

                var datastring = RestfulAPI.setUrl(data);

                $http.get(RestfulAPI.services.updateAgenda+encodeURI(datastring)).success(function()        {

                    init();
                    $scope.cancel();
                    swal("Updated!", "", "success");

                }).error(function(){

                    swal("Error!", "", "error");
                });

                $scope.flag = "save";

            }

        };


        function delFunction(id){


            $http.get(RestfulAPI.services.deleteAgendaItemByID+"?itemId="+id).success(function(data){
                console.log(id);
                swal("Deleted!", "", "success");
                init();
            }).error(function(data){

                swal("Error!", "", "error");
            });
        }

        $scope.del = function(id){

            /*swal({   title: "Are you sure?",   text: "",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, delete it!",   closeOnConfirm: false }, function(){   }); */

            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function(isConfirm) {
                if (isConfirm) {
                    delFunction(id);
                }
            })

        }
    }

})();