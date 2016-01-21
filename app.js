var app = angular.module("meetUpApp", ["ngRoute"]);

app.config(config);

function config($routeProvider) {
    $routeProvider.when("/home",
        {
            templateUrl: "views/home.html",
            controller: "AuthCtrl",
            controllerAs: "auth"
        })
        .when("/list", {
            templateUrl: "views/list.html",
            controller: "ListCtrl",
            controllerAs: "list"
        })
        .when("/event", {
            templateUrl: "views/event.html",
            controller: "EventCtrl",
            controllerAs: "event"
        })
        .otherwise({
            templateUrl: "views/home.html",
            controller: "AuthCtrl",
            controllerAs: "auth"
        });
}
