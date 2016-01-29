angular
    .module("meetUpApp")
    .controller("AuthCtrl", AuthCtrl);

AuthCtrl.$inject = ["users", "$rootScope", "$log", "$location"];

/* @ngInject */
function AuthCtrl(users, $rootScope, $log, $location) {
    var self = this;

    self.users = users.list;

    self.createUser = function() {
        if(users.add({
                "name": self.name,
                "email": self.email,
                "password": self.password
            })){

            $rootScope.currentUser = {
                "name": self.name,
                "email": self.email,
                "password": self.password,
                "isLogin": true
            };

            $log.info($rootScope.currentUser);
        }
    };

    self.login = function() {
        if(users.auth(self.email,self.password)){
            $location.path("/list");
        } else {
            self.message = "Your email or password were incorrect."
        }
    };
}
