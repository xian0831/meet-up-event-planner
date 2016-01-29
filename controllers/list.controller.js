angular
    .module("meetUpApp")
    .controller("ListCtrl", ListCtrl);

ListCtrl.$inject = ["events", "$rootScope"];

/* @ngInject */
function ListCtrl(events, $rootScope) {
    var self = this;

    self.events = events.list;;
}