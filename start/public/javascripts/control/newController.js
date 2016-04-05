/**
 * Created by AlecNing on 2/11/16.
 */
(function() {
    angular.module("myApp").controller("newController", function($scope, newService) {
        newService.getManager($scope);
        $scope.selectManager = newService.selectManager;
        $scope.saveChange = newService.saveChange;

    });
})();