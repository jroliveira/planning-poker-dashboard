System.register(['./../group/group', './queries/get-user-in-groups', './queries/get-all-users', './queries/all-users-played', './queries/first-play'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var group_1, get_user_in_groups_1, get_all_users_1, all_users_played_1, first_play_1;
    var Match;
    return {
        setters:[
            function (group_1_1) {
                group_1 = group_1_1;
            },
            function (get_user_in_groups_1_1) {
                get_user_in_groups_1 = get_user_in_groups_1_1;
            },
            function (get_all_users_1_1) {
                get_all_users_1 = get_all_users_1_1;
            },
            function (all_users_played_1_1) {
                all_users_played_1 = all_users_played_1_1;
            },
            function (first_play_1_1) {
                first_play_1 = first_play_1_1;
            }],
        execute: function() {
            Match = (function () {
                function Match(room) {
                    this._room = room;
                    this._current = 0;
                    this._groups = {
                        '?': new group_1.Group('?')
                    };
                    this._getUser = new get_user_in_groups_1.GetUserInGroups();
                    this._getUsers = new get_all_users_1.GetAllUsers();
                    this._allPlayed = new all_users_played_1.AllUsersPlayed();
                    this._firstPlay = new first_play_1.FirstPlay();
                }
                Object.defineProperty(Match.prototype, "room", {
                    get: function () {
                        return this._room;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Match.prototype, "current", {
                    get: function () {
                        return this._current;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Match.prototype, "groups", {
                    get: function () {
                        var groups = [];
                        for (var groupId in this._groups) {
                            var group = this._groups[groupId];
                            groups.push(group);
                        }
                        return groups;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Match.prototype, "finished", {
                    get: function () {
                        return this._finished;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Match.prototype, "users", {
                    get: function () {
                        return this._getUsers.execute(this._groups);
                    },
                    enumerable: true,
                    configurable: true
                });
                Match.prototype.addUser = function (user) {
                    if (!user.name) {
                        return;
                    }
                    var group = this._groups['?'];
                    group.addUser(user);
                };
                Match.prototype.removeUser = function (userId) {
                    for (var groupId in this._groups) {
                        var group = this._groups[groupId];
                        group.removeUser(userId);
                    }
                };
                Match.prototype.revealCard = function (userId, card) {
                    var user = this._getUser.execute(userId, this._groups);
                    user.reveal(card);
                    this.addUserInGroup(user, card.value);
                    this._finished = this._allPlayed.execute(this._groups);
                    if (this._finished) {
                        this.result();
                        return;
                    }
                    var matchStarted = this._firstPlay.execute(this._groups);
                    if (matchStarted) {
                        this.reset();
                    }
                };
                Match.prototype.addUserInGroup = function (user, groupId) {
                    this.removeUser(user.id);
                    if (!(groupId in this._groups)) {
                        this._groups[groupId] = new group_1.Group(groupId);
                    }
                    var group = this._groups[groupId];
                    group.addUser(user);
                };
                Match.prototype.result = function () {
                    for (var groupId in this._groups) {
                        var group = this._groups[groupId];
                        group.showCards();
                    }
                };
                Match.prototype.reset = function () {
                    var _this = this;
                    this._finished = false;
                    this._current++;
                    var group;
                    for (var groupId in this._groups) {
                        group = this._groups[groupId];
                        group.hideCards();
                    }
                    group = this._groups['?'];
                    var users = this._getUsers.execute(this._groups);
                    users.forEach(function (user) {
                        if (!user.played) {
                            _this.removeUser(user.id);
                            group.addUser(user);
                        }
                    });
                };
                return Match;
            }());
            exports_1("Match", Match);
        }
    }
});
//# sourceMappingURL=match.js.map