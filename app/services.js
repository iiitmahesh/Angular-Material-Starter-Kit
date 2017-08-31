app.factory('apiService', function($http) {
    var apiService = {
        getData: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get('https://hackerearth.0x10.info/api/fashion?type=json&query=list_products').then(function(response) {
                // The then function here is an opportunity to modify the response
                // console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return apiService;
});
