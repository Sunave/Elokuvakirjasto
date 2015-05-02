MovieApp.controller('MovieAppController', function($scope, $routeParams, FirebaseService) {

});

MovieApp.controller('AddMovieController', function($scope, $location, FirebaseService, currentAuth) {

    if(!currentAuth){
        $location.path('/login');
    }

    $scope.addMovie = function() {
        if ($scope.moviename && $scope.director && $scope.releaseyear && $scope.description) {
            FirebaseService.addItem({
                moviename: $scope.moviename,
                director: $scope.director,
                releaseyear: $scope.releaseyear,
                description: $scope.description
            });
            $location.path('/movies');
        }
    }
});

MovieApp.controller('ListMoviesController', function($scope, FirebaseService, currentAuth) {
    $scope.movies = FirebaseService.getAll();

    $scope.removeMovie = function(movie) {
        FirebaseService.removeItem(movie);
    };
});

MovieApp.controller('ShowMovieController', function($scope, $routeParams, currentAuth, $location, FirebaseService) {
    if(!currentAuth && $location.$$path.endsWith('edit')) {
        $location.path('/login');
    }

    $scope.saveMovie = function() {
        if ($scope.movie.moviename && $scope.movie.director && $scope.movie.releaseyear && $scope.movie.description) {
            FirebaseService.saveItem($scope.movie);
            $location.path('movies/' + $scope.movie.$id);
        }
    };

    FirebaseService.getItem($routeParams.key, function(data) {
        $scope.movie = data;
    });

});

MovieApp.controller('ShowApiMovies', function($scope, OMDBService) {
    $scope.searchDone = false;

    $scope.findMovies = function() {
        OMDBService.findMovies($scope.searchName, $scope.searchYear).success(function(movies) {
            $scope.movies = movies.Search;
            $scope.searchDone = true;
        });
    }
});