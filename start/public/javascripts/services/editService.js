/**
 * Created by AlecNing on 2/12/16.
 */
(function() {
    angular.module("myApp").service('editService', function($http) {
        var user;

        var curUser = this;
        curUser.curUserID;
        var curAction;
        var curNumReport;
        curUser.curManager;
        curUser.selected = false;
        curUser.employees;
        curUser.passID = function(id, action, numReport) {
            curUser.curUserID = id;
            console.log("in passID curUserID: " + curUser.curUserID);
            curAction = action;
            curNumReport = numReport;
            console.log(curUser.curUserID);
        };
        curUser.getCurID = function() {
            console.log("curUserID: " + curUser.curUserID)
            return curUser.curUserID;
        };
        //-----get specific user-----//
        curUser.getcurUser = function($scope) {
            $http.get("http://localhost:8888/users/" + curUser.curUserID)
                .success(function(data) {
                    user = data;
                    console.log(typeof data);
                    $scope.fName = data.Name.fName;
                    $scope.lName = data.Name.lName;
                    $scope.Title      = data.Title;
                    $scope.Sex        = data.Sex;
                    $scope.Month      = data["Start Date"].Month;
                    $scope.Day        = data["Start Date"].Day;
                    $scope.year       = data["Start Date"].year;
                    $scope.tel_areaCode = data["Office Phone"].areaCode;
                    $scope.tel_subCode1 = data["Office Phone"].subCode1;
                    $scope.tel_subCode2 = data["Office Phone"].subCode2;
                    $scope.sms_areaCode = data.SMS.areaCode;
                    $scope.sms_subCode1 = data.SMS.subCode1;
                    $scope.sms_subCode2 = data.SMS.subCode2;
                    $scope.Email = data.Email;
                    $scope.NumReport = curNumReport;
                    curUser.getCurEmployees($scope);
                    curUser.getCurManager($scope, data.Manager);
                });
        };

        curUser.getCurEmployees = function($scope) {
            $http.get("http://localhost:8888/users")
                .success(function(data) {
                    $scope.employees = data.filter(function(element) {
                        return element.Manager == user.id;
                    });
                    console.log(curUser.employees);
                });
        };
        curUser.getCurManager = function ($scope, managerID) {
            $http.get("http://localhost:8888/users")
                .success(function(data) {
                    var manager = data.filter(function(element) {
                            return element.id == managerID;
                        });
                    curUser.curManager = manager[0];
                    console.log(manager[0]);
                    $scope.managers = data.filter(function(element) {
                       return (element.Name != undefined) && (element.id != curUser.curUserID) && (element.Manager != curUser.curUserID);
                    });
                    $scope.Manager = manager[0].Name.fName + " " + manager[0].Name.lName;
                });
        };
        curUser.updateManager = function(manager) {
            if(window.confirm("The new Manager is: " + manager.Name.fName + manager.Name.lName)) {
                curUser.curManager = manager;
            }
            console.log("curManager Name " + curUser.curManager.Name.fName + curUser.curManager.Name.lName);
            curUser.selected = !(curUser.selected);
            console.log(curUser.selected);
        };
        curUser.saveChange = function(fName, lName, Title, Sex, Month, Day, year, tel_areaCode, tel_subCode1, tel_subCode2, sms_areaCode, sms_subCode1, sms_subCode2, Email) {
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
                Manager      : curUser.curManager.id
            };
            console.log("packageForPut: " + JSON.stringify(packageForPut));
            $http.post("http://localhost:8888/users/" + curUser.curUserID, packageForPut)
                .then(function(data) {
                    console.log("packageForPut: " + JSON.stringify(packageForPut));
                    console.log("to server update data : " + data);
                })
        };
    });
})();