/**
 * Created by AlecNing on 2/17/16.
 */
(function() {
    angular.module("myApp").service("newService", function($http) {
        var newOne = this;
        newOne.Manager = {};
        newOne.getManager = function($scope) {
            $http.get("http://localhost:8888/users")
                .success(function(data) {
                    $scope.managers = data;
                });
        };
        newOne.selectManager = function(manager) {
            if(window.confirm("Manager is: " + manager.Name.fName + " " + manager.Name.lName) + " Correct?") {
                newOne.Manager = manager;
            }

        };
        newOne.saveChange = function(fName, lName, Title, Sex, Month, Day, year, tel_areaCode, tel_subCode1, tel_subCode2, sms_areaCode, sms_subCode1, sms_subCode2, Email) {
            var packageForPut = {
                fName : fName,
                lName : lName,
                Title : Title,
                Sex : Sex,
                Month : Month,
                Day : Day,
                year : year,
                tel_areaCode : tel_areaCode,
                tel_subCode1 : tel_subCode1,
                tel_subCode2 : tel_subCode2,
                sms_areaCode : sms_areaCode,
                sms_subCode1 : sms_subCode1,
                sms_subCode2 : sms_subCode2,
                Email        : Email,
                Manager      : newOne.Manager.id
            };
            console.log("packageForPut: " + JSON.stringify(packageForPut));
            $http.post("http://localhost:8888/users/", packageForPut)
                .then(function(data) {
                    console.log("packageForPut: " + JSON.stringify(packageForPut));
                    console.log("to server update data : " + data);
                })
        };
    })
})();