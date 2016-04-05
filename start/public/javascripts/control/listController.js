/**
 * Created by AlecNing on 2/11/16.
 */
angular.module("myApp").controller("listController", function($scope, listService, editService, delService, $route) {
    listService.getUsers($scope);
    $scope.passID = editService.passID;
    $scope.deleteID = function(id) {
        var cur_id = id;
        console.log("cur_id : " + cur_id);
        delService.delID(cur_id);
        $route.reload();
    };



});