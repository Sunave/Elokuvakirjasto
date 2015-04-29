MovieApp.service('FirebaseService', function($firebase){
    // Keskustele Firebasen kanssa tämän palvelun avulla
    var firebaseRef = new Firebase('https://shining-heat-364.firebaseio.com/movies')
    var sync = $firebase(firebaseRef);
    var data = sync.$asArray();

    this.addItem = function(item) {
        data.$add(item);
    }

    this.getAll = function() {
        return data;
    }

    /*this.editItem = function(item) {
        data.$save(item);
    }

    this.removeItem = function(item) {
        data.$remove(item);
    }

    this.removeAll = function() {
        data.forEach(function(item){
            data.$remove(item);
        });
    }*/
});