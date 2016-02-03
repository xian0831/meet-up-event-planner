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