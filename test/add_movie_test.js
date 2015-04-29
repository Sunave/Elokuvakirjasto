describe('Add movie', function(){
	var controller, scope;

	var FirebaseServiceMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MovieApp');

    	FirebaseServiceMock = (function(){
            var data = [];

			return {
				// Toteuta FirebaseServicen mockatut metodit tähän
				addItem: function(item) {
                    data.push(item);
                },

                getAll: function() {
                    return data;
                }
			}
		})();

		// Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'addItem').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('AddMovieController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
  	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  	* on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
  	* toBeCalled-oletusta.
	*/
	it('should be able to add a movie by its name, director, release date and description', function(){
		scope.moviename ='test';
        scope.director = 'test';
        scope.releaseyear = 1989;
        scope.description = 'test';
        scope.addMovie();
        expect(FirebaseServiceMock.addItem).toHaveBeenCalled();
        expect(FirebaseServiceMock.getAll().length).toBe(1);
	});

	/*	
	* Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	* EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
	* not.toBeCalled-oletusta (muista not-negaatio!).
	*/
	it('should not be able to add a movie if its name, director, release date or description is empty', function(){
		scope.moviename = 'test';
        scope.addMovie();
        expect(FirebaseServiceMock.addItem).not.toHaveBeenCalled();
        expect(FirebaseServiceMock.getAll().length).toBe(0);
	});
});