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
});