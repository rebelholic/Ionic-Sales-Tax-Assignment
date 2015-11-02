angular.module('starter.services', [])
.factory('ItemList', function($q, $timeout) {

    var itemvar = [
    {
        "id": "1",
        "name": "Item 1",
        "price": 12.49,
        "tax": 0
    },
    {
        "id": "2",
        "name": "Item 2",
        "price": 0.85,
        "tax": 0
    },
    {
        "id": "3",
        "name": "Item 3",
        "price": 14.99,
        "tax": 0.1
    },
    {
        "id": "4",
        "name": "Item 4",
        "price": 10.00,
        "tax": 0.05
    },
    {
        "id": "5",
        "name": "Item 5",
        "price": 47.50,
        "tax": 0.05
    },
    {
        "id": "6",
        "name": "Item 6",
        "price": 27.99,
        "tax": 0.05
    },
    {
        "id": "7",
        "name": "Item 7",
        "price": 18.99,
        "tax": 0.1
    },
     {
        "id": "8",
        "name": "Item 8",
        "price": 9.75,
        "tax": 0
    },
    {
        "id": "9",
        "name": "Item 9",
        "price": 11.25,
        "tax": 0.05
    }             
    ];

        // We use promises to make this api asynchronous. This is clearly not necessary when using in-memory data
        // but it makes this service more flexible and plug-and-play. For example, you can now easily replace this
        // service with a JSON service that gets its data from a remote server without having to changes anything
        // in the modules invoking the data service since the api is already async.

        return {
            findAll: function() {
                var deferred = $q.defer();
                deferred.resolve(itemvar);
                return deferred.promise;
            }
            

        }

    })
    
.factory('$localstorage', ['$window', function($window) {
    //Services untuk localstorage (penyimpanan data secara offline)
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = angular.toJson(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        },
        getArray: function(key) {
            return JSON.parse($window.localStorage[key] || '[]');
        },
        destroy: function(key) {
            $window.localStorage.removeItem(key);
        },
        log: function(key, defaultValue) {
            console.log($window.localStorage[key] || defaultValue);
        },
        logObject: function(key) {
            console.log(JSON.parse($window.localStorage[key] || '{}'));
        }
    }
}]);

