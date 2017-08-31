
var app = angular.module('myApp', ['ui.router', 'ngMaterial', 'ngMessages']);

app.config(function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state("home", {
        url: "/home",
        controller: "homeCtrl",
        templateUrl: "app/views/home.html"
    })
  
});
