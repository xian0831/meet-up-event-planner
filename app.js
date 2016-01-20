var app = angular.module("meetUpApp", ["ngRoute"]);

app.config(function($routeProvider){
   $routeProvider.when("/",
       {
           templateUrl: "views/home.html",
           controller: "AuthCtrl",
           controllerAs: "auth"
       })
       .otherwise({
           templateUrl: "views/home.html",
           controller: "AuthCtrl",
           controllerAs: "auth"
       });
});

app.factory("users",function(){
    var users =  {};

    users.list = [];

    users.add = function(user) {

        if(users.exist(user.email)){
            return false;
        } else {
            users.list.push({"name": user.name,
                "email": user.email,
                "password": user.password});
            return true;
        }
    };

    users.exist = function (email) {
        for (var i = 0; i < users.list.length; i++) {
            if(users.list[i].email === email){
                return true;
            }
        }

        return false;
    };

    return users;
});

app.factory("event",function(){
    var event = {};

    event.list = [];

});

app.controller("AuthCtrl", function(users, $rootScope) {
    var self = this;

    self.users = users.list;

    self.createUser = function() {
        if(users.add({
            "name": self.name,
            "email": self.email,
            "password": self.password
        })){
            $rootScope.currentUser = {
                "name": self.name,
                "email": self.email,
                "password": self.password
            };
        };
    };

    self.login = function() {

    };
});