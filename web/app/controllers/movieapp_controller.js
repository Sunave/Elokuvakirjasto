MovieApp.controller('MovieAppController', function($scope, $routeParams, FirebaseService) {

});

MovieApp.controller('AddMovieController', function($scope, $location, FirebaseService){
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

MovieApp.controller('ListMoviesController', function($scope, FirebaseService) {
    $scope.movies = FirebaseService.getAll();

    $scope.removeMovie = function(movie) {
        FirebaseService.removeItem(movie);
    }
});

MovieApp.controller('ShowMovieController', function($scope, $routeParams, $location, FirebaseService) {
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

/*MovieApp.controller('EditMovieController', function($scope, $location, $routeParams, FirebaseService, GetMovieService) {
    $scope.saveMovie = function() {
        if ($scope.moviename && $scope.director && $scope.releaseyear && $scope.description) {
            FirebaseService.saveItem($scope.movie);
            $location.path('movies/' + $scope.movie.$id);
        }
    };

    $scope.getMovie();
});*/

