MovieApp.service('FirebaseService', function($firebase){
    // Keskustele Firebasen kanssa tämän palvelun avulla
    var firebaseRef = new Firebase('https://shining-heat-364.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var data = sync.$asArray();

    this.addItem = function(item) {
        data.$add(item);
    };

    this.getAll = function() {
        return data;
    };

    this.getItem = function(key, done) {
        data.$loaded(function() {
            done(data.$getRecord(key));
        });
    };

    this.saveItem = function(item) {
        data.$save(item);
    };

    this.removeItem = function(item) {
        data.$remove(item);
    };

});