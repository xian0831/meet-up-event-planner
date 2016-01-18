var app = angular.module("meetUpApp", ["firebase"]);

// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        var ref = new Firebase("https://torrid-inferno-7934.firebaseio.com");
        return $firebaseAuth(ref);
    }
]);

// and use it in our controller
app.controller("AuthCtrl", ["$scope", "Auth",
    function($scope, Auth) {
        $scope.createUser = function() {
            $scope.message = null;
            $scope.error = null;

            Auth.$createUser({
                email: $scope.email,
                password: $scope.password
            }).then(function(userData) {
                $scope.message = "User created with uid: " + userData.uid;
            }).catch(function(error) {
                $scope.error = error;
            });
        };
    }
]);