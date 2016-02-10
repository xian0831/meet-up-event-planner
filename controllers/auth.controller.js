(function() {
    angular
        .module("meetUpApp")
        .controller("AuthCtrl", AuthCtrl);

    AuthCtrl.$inject = ["users", "$localStorage", "$location"];

    function AuthCtrl(users, $localStorage,$location) {
        var self = this;


        var pattern = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,20}$/);

        self.users = users.list;
        self.showPasswordHint = false;

        self.createUser = function() {
            if(!pattern.test(self.password)){
                self.showPasswordHint = true;
            }
            else if(users.add({
                    "name": self.name,
                    "email": self.email,
                    "password": self.password,
                    "bio": self.bio
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


        self.showPasswordCharHint = function() {
            return (!pattern.test(self.password)  ? "bg-danger" : "bg-success");
        };

        self.showPasswordLengthHint = function() {
            return (self.password === undefined || self.password.length < 6  || self.password.length > 20  ? "bg-danger" : "bg-success");
        };
    }
})();

