System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FirstPlay;
    return {
        setters:[],
        execute: function() {
            FirstPlay = (function () {
                function FirstPlay() {
                }
                FirstPlay.prototype.execute = function (groups) {
                    var played = 0;
                    for (var groupId in groups) {
                        var group = groups[groupId];
                        group.users.forEach(function (user) {
                            if (user.played) {
                                played++;
                            }
                        });
                    }
                    return played == 1;
                };
                return FirstPlay;
            }());
            exports_1("FirstPlay", FirstPlay);
        }
    }
});
//# sourceMappingURL=first-play.js.map