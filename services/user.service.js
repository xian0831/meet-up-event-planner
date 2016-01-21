angular
    .module("meetUpApp")
    .factory("users",users);

function users() {
    var users =  {};

    users.list = [];

    users.add = function(user) {

        if(users.exist(user.email)){
            return false;
        } else {
            users.list.push({"name": user.name,
                "email": user.email,
                "password": user.password});
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