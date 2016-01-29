angular
    .module("meetUpApp")
    .controller("EventCtrl", EventCtrl);

EventCtrl.$inject = ["events","$log", "$location"];

/* @ngInject */
function EventCtrl(events, $log, $location) {
    var self = this;

    self.createEvent = function() {
        events.add({
            "eventName" : self.eventName,
            "eventHost" : self.eventHost,
            "eventLocation": self.eventLocation,
            "eventStartDate": self.eventStartDate,
            "eventStartTime": self.eventStartTime,
            "eventEndDate": self.eventEndDate,
            "eventEndTime": self.eventEndTime
        });

        $location.path("/list");
    }





}

