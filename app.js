var app = angular.module("meetUpApp", ["ngRoute"]);



// and use it in our controller
app.controller("AuthCtrl", ["$scope", "Auth",
    function($scope) {
        $scope.createUser = function() {
            $scope.message = null;
            $scope.error = null;


        };

        $scope.login = function() {

        };
    }
]);