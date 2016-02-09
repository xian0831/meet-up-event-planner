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

