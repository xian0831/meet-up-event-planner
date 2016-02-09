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


function geolocate() {
    var autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById("location")),
        {types: ["geocode"]});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
"use strict";angular.module("ngAutocomplete",[]).directive("ngAutocomplete",function(){return{require:"ngModel",scope:{ngModel:"=",options:"=?",details:"=?"},link:function(e,t,n,o){var s,a=!1,c=function(){s={},e.options&&(a=e.options.watchEnter!==!0?!1:!0,e.options.types?(s.types=[],s.types.push(e.options.types),e.gPlace.setTypes(s.types)):e.gPlace.setTypes([]),e.options.bounds?(s.bounds=e.options.bounds,e.gPlace.setBounds(s.bounds)):e.gPlace.setBounds(null),e.options.country?(s.componentRestrictions={country:e.options.country},e.gPlace.setComponentRestrictions(s.componentRestrictions)):e.gPlace.setComponentRestrictions(null))};void 0==e.gPlace&&(e.gPlace=new google.maps.places.Autocomplete(t[0],{})),google.maps.event.addListener(e.gPlace,"place_changed",function(){var n=e.gPlace.getPlace();void 0!==n&&(void 0!==n.address_components?e.$apply(function(){e.details=n,o.$setViewValue(t.val())}):a&&i(n))});var i=function(n){var s=new google.maps.places.AutocompleteService;n.name.length>0&&s.getPlacePredictions({input:n.name,offset:n.name.length},function(n,s){if(null==n||0==n.length)e.$apply(function(){e.details=null});else{var a=new google.maps.places.PlacesService(t[0]);a.getDetails({reference:n[0].reference},function(n,s){s==google.maps.GeocoderStatus.OK&&e.$apply(function(){o.$setViewValue(n.formatted_address),t.val(n.formatted_address),e.details=n;t.on("focusout",function(e){t.val(n.formatted_address),t.unbind("focusout")})})})}})};o.$render=function(){var e=o.$viewValue;t.val(e)},e.watchOptions=function(){return e.options},e.$watch(e.watchOptions,function(){c()},!0)}}});
(function(){

    angular
        .module("meetUpApp")
        .factory("events",["$localStorage",events]);
    function events($localStorage) {
        var events = {};

        $localStorage.events = $localStorage.events || [];
        events.list =  $localStorage.events;


        events.add = function(event) {
            events.list.push({
                "user" : $localStorage.currentUser.email,
                "eventName" : event.eventName,
                "eventHost" : event.eventHost,
                "eventType" : event.eventType,
                "eventLocation": event.eventLocation,
                "eventStartDate": event.eventStartDate,
                "eventEndDate": event.eventEndDate,
                "eventGuestList": event.eventGuestList
            });
        };

        return events;

    }
})();

(function(){
    angular
        .module('meetUpApp')
        .factory('$localstorage', ['$window', localStorage]);

    function localStorage($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }
})();

(function(){
    angular
        .module("meetUpApp")
        .factory("users",["$localStorage",users]);

    function users($localStorage) {
        var users =  {};

        $localStorage.list = $localStorage.list || [];
        users.list =  $localStorage.list;

        users.add = function(user) {
            if(users.exist(user.email)){
                return false;
            } else {
                users.list.push({
                    "name": user.name,
                    "email": user.email,
                    "password": user.password});
                $localStorage.currentUser = {
                    "email": self.email,
                    "isLogin": true};
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

        users.auth = function (email,password){
            for (var i = 0; i < users.list.length; i++) {
                if(users.list[i].email === email && users.list[i].password === password){
                    return true;
                }
            }
            return false;
        };

        return users;
    }
})();

(function() {
    angular
        .module("meetUpApp")
        .controller("AuthCtrl", AuthCtrl);

    AuthCtrl.$inject = ["users", "$localStorage", "$location"];

    function AuthCtrl(users, $localStorage,$location) {
        var self = this;

        self.users = users.list;

        self.createUser = function() {
            if(users.add({
                    "name": self.name,
                    "email": self.email,
                    "password": self.password
                })){
                $localStorage.currentUser = {
                    "email": self.email,
                    "isLogin": true};

                $location.path("/list");
            } else {
                self.message = "The email address is already being used.";
            }
        };

        self.login = function() {
            if(users.auth(self.email,self.password)){
                $localStorage.currentUser = {
                    "email": self.email,
                    "isLogin": true};
                $location.path("/list");
            } else {
                self.message = "Your email or password were incorrect.";
            }
        };
    }
})();


(function(){
    angular
        .module("meetUpApp")
        .controller("EventCtrl", EventCtrl);

    EventCtrl.$inject = ["events", "$location"];

    function EventCtrl(events, $location) {
        var self = this;

        self.compareDate = function() {
            var sDate = new Date(self.eventStartDate);
            var eDate = new Date(self.eventEndDate);

            if(sDate>eDate){
                self.message = "End Date / Time cannot be earlier than Start Date / Time.";
            } else {
                self.message = "";
            }
        };

        self.eventAvailableType = [
            "General",
            "Birthday",
            "Conference",
            "Wedding",
            "Party",
            "Movie"
        ];

        self.eventType = self.eventAvailableType[0];

        self.eventGuestList = [];
        self.createEvent = function() {

            events.add({
                "eventName" : self.eventName,
                "eventHost" : self.eventHost,
                "eventType" : self.eventType,
                "eventLocation": self.eventLocation,
                "eventStartDate": self.eventStartDate,
                "eventEndDate": self.eventEndDate,
                "eventGuestList": self.eventGuestList
            });

            $location.path("/list");

        };

        self.addGuest = function() {

            if(self.eventGuest){
                self.eventGuestList.push(self.eventGuest);
                self.eventGuest = "";
            }

        }
    }

})();


(function(){
    angular
        .module("meetUpApp")
        .controller("ListCtrl", ListCtrl);

    ListCtrl.$inject = ["events","$localStorage", "$log", "$location","$uibModal"];

    function ListCtrl(events, $localStorage, $log, $location, $uibModal) {

        if(!$localStorage.currentUser){
            $location.path("/home");
        }

        var self = this;
        self.events = events.list.filter(function(obj){
            if(obj.user === $localStorage.currentUser.email){
                return true;
            }
        });

        self.open = function(index) {
            self.currentEvent = self.events[index];
            $log.info(self.currentEvent);
            var modalInstance = $uibModal.open({
                templateUrl: 'views/eventView.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    event: function () {
                        return self.currentEvent;
                    }
                }

            });
        }

    }

    angular.module("meetUpApp").controller("ModalInstanceCtrl", ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ["$scope", "$uibModalInstance", "event"];

    function ModalInstanceCtrl ($scope, $uibModalInstance, event) {
        $scope.event = event;
    }
})();

