angular
    .module("meetUpApp")
    .controller("EventCtrl", EventCtrl);

EventCtrl.$inject = ["events","$log", "$location"];

/* @ngInject */
function EventCtrl(events, $log, $location) {
    var self = this;

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
            "eventStartTime": self.eventStartTime,
            "eventEndDate": self.eventEndDate,
            "eventEndTime": self.eventEndTime,
            "eventGuestList": self.eventGuestList
        });

        $location.path("/list");
    }

    self.addGuest = function() {

        if(self.eventGuest){
            self.eventGuestList.push(self.eventGuest);
            self.eventGuest = "";
        }

    }





}

