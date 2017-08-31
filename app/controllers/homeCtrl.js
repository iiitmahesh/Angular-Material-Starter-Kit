'use strict';

app.filter('slice', function() {
    return function(input, sliceFrom, sliceTo) {
        // do some bounds checking here to ensure it has that index
        return input.slice(sliceFrom, sliceTo);
    }
});

app.directive('rating', function() {
    return {
        scope: {
            rate: '=',
            onUpdate: '&'
        },
        templateUrl: 'app/views/rating.html',
        link: function(scope, element, attrs) {
            scope.range = [1, 2, 3, 4, 5];
            scope.rate = parseFloat(scope.rate);
            scope.update = function(value) {
                scope.rate = value;
                if (scope.onUpdate) {
                    scope.onUpdate({ value: value });
                }
            };
        }
    };
})
app.filter('split', function() {
    return function(input, delimiter) {
        var delimiter = delimiter || ',';
        return input.split(delimiter);
    }
});


app.controller('homeCtrl', function($scope, apiService, $mdDialog, $filter) {

    apiService.getData().then(function(data, headers) {
        $scope.content = data.products;
        $scope.total = $scope.content.length;
        $scope.quote_available = data.quote_available;
        $scope.quote_max = data.quote_max;
        console.log(headers);

        console.log($scope.tags);
    });

    var searchOptions = [
        { category: 'basic', name: 'By Name' },
        { category: 'basic', name: 'By Price' },
        { category: 'adv', name: 'By Rating' },
        { category: 'adv', name: 'By Category' },
        { category: 'adv', name: 'By Quantity' }
    ];

    $scope.sortBy = function(x) {
        $scope.content = $filter('orderBy')($scope.content, "-" + x);
        console.log($scope.content);
    };


    $scope.searchOptions = searchOptions;
    $scope.likes = {};
    $scope.like = function(itemID) {
        if (window.localStorage) {
            var itemValue = parseInt(localStorage.getItem(itemID));
            if (itemValue) {
                localStorage.setItem(itemID, itemValue + 1);
                $scope.likes[itemID] = itemValue + 1;
            } else {
                localStorage.setItem(itemID, 1);
                $scope.likes[itemID] = 1;
            }
        } else {
            console.error("window.localStorage is not available in your browser. Please update it.");
        }
    }

    $scope.unlike = function(itemID) {
        if (window.localStorage) {
            var itemValue = parseInt(localStorage.getItem(itemID));
            if (itemValue) {
                localStorage.setItem(itemID, itemValue - 1);
                $scope.likes[itemID] = itemValue - 1;
            } else {
                localStorage.setItem(itemID, 1);
                $scope.likes[itemID] = 1;
            }
        } else {
            console.error("window.localStorage is not available in your browser. Please update it.");
        }
    }

    $scope.getlikes = function(itemID) {
        if (window.localStorage) {
            var itemValue = parseInt(localStorage.getItem(itemID));
            if (itemValue) {
                $scope.likes[itemID] = itemValue;
            } else {
                $scope.likes[itemID] = 0;
            }
        } else {
            console.error("window.localStorage is not available in your browser. Please update it.");
        }
    }

    $scope.searchBytag = function(tag) {
        $scope.searchText = tag;
    }
    $scope.showAdd = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/views/modal.html',
                targetEvent: ev,
            })
            .then(function(answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    };

});
