(function(){

    'use strict';

    angular.module('ipm')    
        .controller('UserController',UserController)
        .controller('LoginController',LoginController);

    function UserController($scope,$http,BootsrapService,RestfulAPI){

         var login = RestfulAPI.checkLogin();
        var self = this;

        $scope.user = {};
        var permissions = [
            {
                name:"dashboard",
                perm:false
            },
            {
                name:"participants",
                perm:false
            },
            {
                name:"speakers",
                perm:false
            },
            {
                name:"agenda",
                perm:false
            },
            {
                name:"users",
                perm:false
            },
            {
                name:"attendance",
                perm:false
            },
            {
                name:"QRList",
                perm:false
            }
        ];

        $scope.permissions = permissions;

        // angular.copy( $scope.permissions, permissions);


        $scope.pinfo = function(){

            self.modal  =  BootsrapService.modal({
                url:'pages/user-modal.html',
                scope: $scope
            });

        };


        function init(){

            $http.get(RestfulAPI.services.getusers).success(function(data){

                $scope.users = [];

                data.map(function(item){

                    $scope.users.push({
                        username : item.username,
                        email:item.email,
                        password:item.password,
                        permissions: JSON.parse(item.permissions),
                        id:item.id

                    });

                });


            }).error(function(){

            });
        }

        init();

        $scope.jsonParse = function(a){

            var b = JSON.parse(a);

            return b;
        };
        $scope.save = function(){






            if($scope.flag == "save"){
                swal("Saving..", "");

                var data = {
                    username:$scope.user.username,
                    password:$scope.user.password,
                    email:$scope.user.email,
                    permissions:$scope.permissions

                };

                //editUser

                $http.post(RestfulAPI.services.register,data).success(function(data){



                    init();
                    $scope.cancel();
                    swal("Saved!", "", "success");

                }).error(function(){

                    swal("Error!", "", "error");
                });


            }else{
                swal("Updating..", "");

                var data = {
                    username:$scope.user.username,
                    password:$scope.user.password,
                    email:$scope.user.email,
                    permissions:$scope.permissions,
                    id: $scope.user.id
                };

                $http.post(RestfulAPI.services.editUser,data).success(function()        {

                    init();
                    $scope.cancel();
                    swal("Updated!", "", "success");
                    $scope.permissions = permissions;


                }).error(function(){

                    swal("Error!", "", "error");
                    $scope.permissions = permissions;
                    $scope.flag = "edit";

                });

                $scope.flag = "save";

            }





        };

        $scope.cancel = function () {

            self.modal.dismiss('cancel');
        };

        $scope.flag = "save";
        $scope.edit = function(index){

            $scope.flag = "edit";

            $scope.user.username =  $scope.users[index].username;
            $scope.user.password = $scope.users[index].password;
            $scope.user.email  =   $scope.users[index].email;
            $scope.user.id = $scope.users[index].id;

            console.log( $scope.users);
            //$scope.permissions = $scope.users[index].permissions;

            angular.copy( $scope.users[index].permissions, $scope.permissions);

            /* $scope.users[index].permissions.map(function(item){



            }); */

            $scope.pinfo();


        };


        function delFunction(id){


            $http.get(RestfulAPI.services.deleteUser+"?id="+id).success(function(data){

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

    function LoginController($scope,$http,BootsrapService,RestfulAPI,$rootScope,$state){

        $scope.login = function(){

            var data = {

                email: $scope.email||"",
                password:$scope.password||""
            };
            $http.post(RestfulAPI.services.login,data).success(function(data){

                if(data == 0){
                    swal("error", "Invalid Username or password","error");

                }else{  

                    $rootScope.userInfo = data[0];

                    $rootScope.loginStatus = true;

                    var perm = false;

                    var tem = JSON.parse(data[0].permissions);
                    data[0].permissions = tem;
                    $rootScope.userInfo.permissions  = tem;
                    for(var i = 0; i< data[0].permissions.length;i++){
                        if(data[0].permissions[i].perm){
                            perm = data[0].permissions[i].name;
                            break;
                        }

                    }
                    if(perm){
                        $state.go(perm);
                    }else{

                        swal("error", "You don't have proper priviledges","error");
                    }
                }
            }).error(function(){

                swal("error", "something went wrong","error");
            });
        };

        $scope.logout = function(){

            $rootScope.userInfo = {};

            $rootScope.loginStatus = false;
            $state.go('login');  
        };

    }
})();