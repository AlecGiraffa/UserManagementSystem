/**
 * Created by AlecNing on 2/11/16.
 */
(function() {
    angular.module("myApp").controller("editController", function($scope, editService) {
        $scope.id = editService.getCurID();
        console.log("id: " + $scope.id);
        editService.getcurUser($scope);
        $scope.updateManager = editService.updateManager;
        $scope.selected = editService.selected;
        $scope.saveChange = editService.saveChange;



    });
})();