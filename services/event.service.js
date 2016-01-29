angular
    .module("meetUpApp")
    .factory("events",events);

function events() {
    var events = {};

    events.list = [{
        "eventName" : "Foo Event",
        "eventHost" : "Foo Host",
        "eventLocation": "Foo Location",
        "eventStartDate": "2015-06-04",
        "eventStartTime": "16:21",
        "eventEndDate": "2015-06-05",
        "eventEndTime": "16:21"
    }];

    events.add = function(event) {
        events.list.push({
            "eventName" : event.eventName,
            "eventHost" : event.eventHost,
            "eventLocation": event.eventLocation,
            "eventStartDate": event.eventStartDate,
            "eventStartTime": event.eventStartTime,
            "eventEndDate": event.eventEndDate,
            "eventEndTime": event.eventEndTime
        });
    };

    return events;

}