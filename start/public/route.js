/**
 * Created by AlecNing on 2/11/16.
 */
(function () {
   angular.module("myApp", ["ngRoute",'infinite-scroll']).config(["$routeProvider", function($routeProvider) {
           $routeProvider
               .when("/list", {
                   templateUrl : "sites/list.html",
                   controller : "listController"
               })
               .when("/edit", {
                   templateUrl : "sites/edit.html",
                   controller : "editController"
               })
               .when("/new", {
                   templateUrl : "sites/new.html",
                   controller : "newController"
               })
               .otherwise({
                   redirectTo : "/list"
               });
       }]);
})();