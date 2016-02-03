angular
    .module("meetUpApp")
    .controller("ListCtrl", ListCtrl);

ListCtrl.$inject = ["events","$localStorage", "$log", "$location","$uibModal"];

/* @ngInject */
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

angular.module("meetUpApp").controller("ModalInstanceCtrl", ["$scope", "$uibModalInstance", "event", function ($scope, $uibModalInstance, event) {

    $scope.event = event;

}]);