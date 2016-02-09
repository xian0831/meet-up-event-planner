(function(){
    angular.module("meetUpApp", ["ngRoute","ngStorage","ngAnimate","ui.bootstrap","ngAutocomplete"]);

    angular.module("meetUpApp").config(config);

    /* ngInject */
    config.$inject = ["$routeProvider"];

    function config($routeProvider) {
        $routeProvider.when("/signup",
            {
                templateUrl: "views/signup.html",
                controller: "AuthCtrl",
                controllerAs: "auth"
            })
            .when("/login",{
                templateUrl: "views/login.html",
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
})();

