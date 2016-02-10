(function(){
    angular
        .module("meetUpApp")
        .factory("users",["$localStorage",users]);

    function users($localStorage) {
        var users =  {};

        $localStorage.list = $localStorage.list || [];
        users.list =  $localStorage.list;

        users.add = function(user) {
            if(users.exist(user.email)){
                return false;
            } else {
                users.list.push({
                    "name": user.name,
                    "email": user.email,
                    "password": user.password,
                    "bio": user.bio});
                $localStorage.currentUser = {
                    "email": self.email,
                    "isLogin": true};
                return true;
            }
        };

        users.exist = function (email) {
            for (var i = 0; i < users.list.length; i++) {
                if(users.list[i].email === email){
                    return true;
                }
            }

            return false;
        };

        users.auth = function (email,password){
            for (var i = 0; i < users.list.length; i++) {
                if(users.list[i].email === email && users.list[i].password === password){
                    return true;
                }
            }
            return false;
        };

        return users;
    }
})();
