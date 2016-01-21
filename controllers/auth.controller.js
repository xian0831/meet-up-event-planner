

angular
    .module("meetUpApp")
    .controller("AuthCtrl", AuthCtrl);

AuthCtrl.$inject = ["users", "$rootScope"];

/* @ngInject */
function AuthCtrl(users, $rootScope) {
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
                "password": self.password
            };
        };
    };

    self.login = function() {
        if(users.auth(self.email,self.password)){
            self.message = "Pass"
        } else {
            self.message = "Fail"
        }
    };
}
