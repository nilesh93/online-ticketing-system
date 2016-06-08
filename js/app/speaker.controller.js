(function(){

    'use strict';

    angular.module('ipm')

        .controller('SpeakerController', SpeakerController);


    function SpeakerController($scope,$http,BootsrapService,RestfulAPI){

        var self = this;

        $scope.speaker = {};

        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];


        $scope.pinfo = function(){


            self.modal  =  BootsrapService.modal({
                url:'pages/speaker-modal.html',
                scope: $scope
            });

        };

        $scope.flag = "save";
        $scope.edit = function(index){

            $scope.flag = "edit";

            $scope.speaker.name =  $scope.speakerList[index].speaker_name;
            $scope.speaker.country = $scope.speakerList[index].speaker_country;
            $scope.speaker.desc  =   $scope.speakerList[index].speaker_description;
            $scope.speaker.img = $scope.speakerList[index].speaker_image;
            $scope.speaker.id = $scope.speakerList[index].speaker_id;
            $scope.pinfo();




        };



        $scope.cancel = function () {

            self.modal.dismiss('cancel');


        };

        function init(){
            $http.get(RestfulAPI.services.showAllSpeakers).success(function(data){

                console.log("data",data);
                $scope.speakerList = data.data;

            }).error(function(){


            });

        }




        init();


        $scope.save = function(){



            if($scope.flag == "save"){
                swal("Saving..", "");

                var data = {
                    speakerName   : $scope.speaker.name || "",
                    speakerDescription : $scope.speaker.desc|| "",
                    speakerImage : "",
                    speakerCountry : $scope.speaker.country|| ""
                };

                var datastring = RestfulAPI.setUrl(data);

                $http.get(RestfulAPI.services.addSpeakers+datastring).success(function()        {

                    init();
                    $scope.cancel();
                    swal("Saved!", "", "success");

                }).error(function(){

                    swal("Error!", "", "error");
                });
            }else{
                swal("Updating..", "");

                var data = {
                    speakerName   : $scope.speaker.name || "",
                    speakerDescription : $scope.speaker.desc|| "",
                    speakerImage : $scope.speaker.img || "",
                    speakerCountry : $scope.speaker.country|| "",
                    speakerId :  $scope.speaker.id
                };

                var datastring = RestfulAPI.setUrl(data);

                $http.get(RestfulAPI.services.UpdateSpeakers+datastring).success(function()        {

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


            $http.get(RestfulAPI.services.deleteSpeaker+"?speakerId="+id).success(function(data){

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

        $scope.cancel = function () {

            self.modal.dismiss('cancel');
        };

    }

})();