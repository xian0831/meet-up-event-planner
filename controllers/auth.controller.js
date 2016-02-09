(function() {
    angular
        .module("meetUpApp")
        .controller("AuthCtrl", AuthCtrl);

    AuthCtrl.$inject = ["users", "$localStorage", "$location"];

    function AuthCtrl(users, $localStorage,$location) {
        var self = this;

        self.users = users.list;

        self.createUser = function() {
            if(users.add({
                    "name": self.name,
                    "email": self.email,
                    "password": self.password
                })){
                $localStorage.currentUser = {
                    "email": self.email,
                    "isLogin": true};

                $location.path("/list");
            } else {
                self.message = "The email address is already being used.";
            }
        };

        self.login = function() {
            if(users.auth(self.email,self.password)){
                $localStorage.currentUser = {
                    "email": self.email,
                    "isLogin": true};
                $location.path("/list");
            } else {
                self.message = "Your email or password were incorrect.";
            }
        };
    }
})();

