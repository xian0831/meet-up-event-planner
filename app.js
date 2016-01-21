var app = angular.module("meetUpApp", ["ngRoute"]);

app.config(config);

function config($routeProvider) {
    $routeProvider.when("/",
        {
            templateUrl: "views/home.html",
            controller: "AuthCtrl",
            controllerAs: "auth"
        })
        .when("/events", {
            templateUrl: "views/events.html",
            controller: "EventCtrl",
            controllerAs: "event"
        })
        .otherwise({
            templateUrl: "views/home.html",
            controller: "AuthCtrl",
            controllerAs: "auth"
        });
}
