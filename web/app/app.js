// Toteuta moduulisi tänne
var MovieApp = angular.module("MovieApp", ['firebase', 'ngRoute']);

MovieApp.config(function($routeProvider) {
    $routeProvider
        .when('/movies', {
            templateUrl: 'app/views/list_movies.html',
            controller: 'ListMoviesController'
        })
        .when('/movies/new', {
            templateUrl: 'app/views/add_movie.html',
            controller: 'AddMovieController'
        })
        .when('/movies/:key', {
            templateUrl: 'app/views/show_movie.html',
            controller: 'ShowMovieController'
        })
        .when('/movies/:key/edit', {
            templateUrl: 'app/views/edit_movie.html',
            controller: 'ShowMovieController'
        })
        .otherwise({
            redirectTo: '/movies'
        });
});