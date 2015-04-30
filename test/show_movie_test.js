describe('Show movie', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MovieApp');

    	FirebaseServiceMock = (function(){
            var moviedata = {
                $id: 'abc123',
                moviename: 'test',
                director: 'Antti',
                releaseyear: 2015,
                description: 'Mahtava leffa!'
            };

			return {
				// Toteuta FirebaseServicen mockatut metodit tähän
                getItem: function(key, done) {
                    console.log("key is " + key);

                    if (key === 'test') {
                        done(moviedata);
                    } else {
                        done(null);
                    }
                }
			}
		})();

		RouteParamsMock = (function(){
			return {
				// Toteuta mockattu $routeParams-muuttuja tähän
                key: 'test'
			}
		})();

		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'getItem').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('ShowMovieController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock,
	       	$routeParams: RouteParamsMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/* 
  	* Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should show current movie from Firebase', function(){
        expect(FirebaseServiceMock.getItem).toHaveBeenCalled();
        expect(scope.movie.moviename).toEqual('test');
	});
});