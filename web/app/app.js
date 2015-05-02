// Toteuta moduulisi tänne
var MovieApp = angular.module("MovieApp", ['firebase', 'ngRoute']);

MovieApp.config(function($routeProvider) {
    $routeProvider
        .when('/movies', {
            templateUrl: 'app/views/list_movies.html',
            controller: 'ListMoviesController',
            resolve: {
                currentAuth: function (AuthenticationService) {
                    return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies/new', {
            templateUrl: 'app/views/add_movie.html',
            controller: 'AddMovieController',
            resolve: {
                currentAuth: function (AuthenticationService) {
                    return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies/search', {
            templateUrl: 'app/views/search_movies.html',
            controller: 'ShowApiMovies'
        })
        .when('/movies/:key', {
            templateUrl: 'app/views/show_movie.html',
            controller: 'ShowMovieController',
            resolve: {
                currentAuth: function (AuthenticationService) {
                    return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies/:key/edit', {
            templateUrl: 'app/views/edit_movie.html',
            controller: 'ShowMovieController',
            resolve: {
                currentAuth: function (AuthenticationService) {
                    return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/signup', {
            controller: 'UserController',
            templateUrl: 'app/views/register_user.html',
        })
        .when('/login', {
            controller: 'UserController',
            templateUrl: 'app/views/login_user.html',
        })
        .otherwise({
            redirectTo: '/movies'
        });
});

MovieApp.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

MovieApp.run(function(AuthenticationService, $rootScope, $location){
    $rootScope.logOut = function(){
        AuthenticationService.logUserOut();
        $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
        $location.path('#/logout');
    };

    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});