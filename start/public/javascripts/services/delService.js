/**
 * Created by AlecNing on 2/17/16.
 */
(function(){
    angular.module("myApp").service("delService", function($http) {
        var delOne = this;
        delOne.delID = function(id) {
            $http.delete("http://localhost:8888/users/" + id)
                .then(function(data) {
                    console.log("deleted");
                })
        }
    });
})();