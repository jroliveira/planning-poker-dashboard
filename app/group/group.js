System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Group;
    return {
        setters:[],
        execute: function() {
            Group = (function () {
                function Group(id) {
                    this._users = {};
                    this._id = id;
                }
                Object.defineProperty(Group.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Group.prototype, "users", {
                    get: function () {
                        var users = [];
                        for (var userId in this._users) {
                            var user = this._users[userId];
                            users.push(user);
                        }
                        return users;
                    },
                    enumerable: true,
                    configurable: true
                });
                Group.prototype.addUser = function (user) {
                    this._users[user.id] = user;
                };
                Group.prototype.removeUser = function (userId) {
                    if (!this.getUser(userId)) {
                        return;
                    }
                    delete this._users[userId];
                };
                Group.prototype.getUser = function (userId) {
                    if (!(userId in this._users)) {
                        return null;
                    }
                    return this._users[userId];
                };
                Group.prototype.showCards = function () {
                    for (var userId in this._users) {
                        var user = this._users[userId];
                        user.show();
                    }
                };
                Group.prototype.hideCards = function () {
                    for (var userId in this._users) {
                        var user = this._users[userId];
                        user.hide();
                    }
                };
                return Group;
            }());
            exports_1("Group", Group);
        }
    }
});
//# sourceMappingURL=group.js.map