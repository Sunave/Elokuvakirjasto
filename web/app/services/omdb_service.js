MovieApp.service('OMDBService', function($http) {
   this.findMovies = function(name, year) {
       return $http.get('http://omdbapi.com', { params: { s: name, y: year } });
   }
});