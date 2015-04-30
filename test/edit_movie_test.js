describe('Edit movie', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MovieApp');

    	FirebaseServiceMock = (function(){
            var data = {
                $id: 'abc123',
                moviename: 'test',
                director: 'Antti',
                releaseyear: 2015,
                description: 'Mahtava leffa!'
            };

			return {
				// Toteuta FirebaseServicen mockatut metodit tähän
                getItem: function(key, done) {
                    if (key == 'abc123') {
                        done(data);
                    } else {
                        done(null);
                    }
                },

                saveItem: function(item) {
                    data = item;
                }
			}
		})();

		RouteParamsMock = (function(){
			return {
				// Toteuta mockattu $routeParams-muuttuja tähän
                key: 'abc123'
			}
		})();

		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'getItem').and.callThrough();
	    spyOn(FirebaseServiceMock, 'saveItem').and.callThrough();

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
  	* Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/
  	it('should fill the edit form with the current information about the movie', function(){
        expect(FirebaseServiceMock.getItem).toHaveBeenCalled();
        expect(scope.movie.moviename).toEqual('test');
        expect(scope.movie.director).toEqual('Antti');
        expect(scope.movie.releaseyear).toBe(2015);
        expect(scope.movie.description).toEqual('Mahtava leffa!');
  	});

  	/* 
  	* Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to edit a movie by its name, director, release date and description', function(){
        scope.movie.moviename = 'modified test';
        scope.saveMovie();
        expect(scope.movie.moviename).toEqual('modified test');
        expect(FirebaseServiceMock.saveItem).toHaveBeenCalled();
	});

	/*
	* Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
  	* käyttämällä not.toBeCalled-oletusta.
	*/
	it('should not be able to edit a movie if its name, director, release date or description is empty', function(){
        scope.movie.moviename = '';
        scope.saveMovie();
        expect(FirebaseServiceMock.saveItem).not.toHaveBeenCalled();
	});
});