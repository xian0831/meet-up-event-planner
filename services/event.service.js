angular
    .module("meetUpApp")
    .factory("events",events);

function events() {
    var event = {};

    event.list = [
        {"name":"Event1"},
        {"name": "event2"}];


}