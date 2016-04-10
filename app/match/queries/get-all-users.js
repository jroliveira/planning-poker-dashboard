System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GetAllUsers;
    return {
        setters:[],
        execute: function() {
            GetAllUsers = (function () {
                function GetAllUsers() {
                }
                GetAllUsers.prototype.execute = function (groups) {
                    var users = [];
                    for (var groupId in groups) {
                        var group = groups[groupId];
                        group.users.forEach(function (user) {
                            users.push(user);
                        });
                    }
                    return users;
                };
                return GetAllUsers;
            }());
            exports_1("GetAllUsers", GetAllUsers);
        }
    }
});
//# sourceMappingURL=get-all-users.js.map