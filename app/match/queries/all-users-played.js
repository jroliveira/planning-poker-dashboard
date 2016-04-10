System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AllUsersPlayed;
    return {
        setters:[],
        execute: function() {
            AllUsersPlayed = (function () {
                function AllUsersPlayed() {
                }
                AllUsersPlayed.prototype.execute = function (groups) {
                    var notPlayed = false;
                    for (var groupId in groups) {
                        var group = groups[groupId];
                        group.users.forEach(function (user) {
                            if (!user.played) {
                                notPlayed = true;
                                return;
                            }
                        });
                        if (notPlayed) {
                            return false;
                        }
                    }
                    return true;
                };
                return AllUsersPlayed;
            }());
            exports_1("AllUsersPlayed", AllUsersPlayed);
        }
    }
});
//# sourceMappingURL=all-users-played.js.map