System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GetUserInGroups;
    return {
        setters:[],
        execute: function() {
            GetUserInGroups = (function () {
                function GetUserInGroups() {
                }
                GetUserInGroups.prototype.execute = function (userId, groups) {
                    for (var groupId in groups) {
                        var group = groups[groupId];
                        var user = group.getUser(userId);
                        if (user) {
                            return user;
                        }
                    }
                    return null;
                };
                return GetUserInGroups;
            }());
            exports_1("GetUserInGroups", GetUserInGroups);
        }
    }
});
//# sourceMappingURL=get-user-in-groups.js.map