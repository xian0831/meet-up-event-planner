angular
    .module("meetUpApp")
    .factory("events",events);

function events() {
    var events = {};

    events.list = [];

    return events;

}