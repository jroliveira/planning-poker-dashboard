System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(id, name) {
                    this._plays = 0;
                    this._id = id;
                    this._name = name;
                }
                Object.defineProperty(User.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "card", {
                    get: function () {
                        return this._card;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "played", {
                    get: function () {
                        return this._plays > 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                User.prototype.reveal = function (card) {
                    this._plays++;
                    this._card = card;
                };
                User.prototype.show = function () {
                    this._plays = 0;
                    this._card.show();
                };
                User.prototype.hide = function () {
                    if (!this.played) {
                        this._card = null;
                    }
                };
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map