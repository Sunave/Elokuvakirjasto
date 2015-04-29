// Toteuta moduulisi tänne
var MovieApp = angular.module("MovieApp", ['firebase', 'ngRoute']);

MovieApp.config(function($routeProvider) {
    $routeProvider
        .when('/movies', {
            templateUrl: 'app/views/list_movies.html'
        })
        .when('/movies/new', {
            templateUrl: 'app/views/add_movie.html'
        })
        .otherwise({
            redirectTo: '/movies'
        });
});