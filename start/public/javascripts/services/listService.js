/**
 * Created by AlecNing on 2/11/16.
 */
(function() {
    angular.module("myApp").service('listService', function ($http) {
        //---------get all users----------//
        var list = this;
        list.getUsers = function($scope) {
            $http.get("http://localhost:8888/users")
                .success(function(data) {
                    console.log("from server, data for list is: " + data);
                    $scope.users = data.filter(function(element) {
                       return element.hasOwnProperty("id");
                    });
                });
        };
    });
})();