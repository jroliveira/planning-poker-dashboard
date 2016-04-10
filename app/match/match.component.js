System.register(['angular2/core', './../card/card', './../user/user', './match', './../group/group.component', './../core/socket-service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, card_1, user_1, match_1, group_component_1, socket_service_1;
    var MatchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (match_1_1) {
                match_1 = match_1_1;
            },
            function (group_component_1_1) {
                group_component_1 = group_component_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            }],
        execute: function() {
            MatchComponent = (function () {
                function MatchComponent() {
                    var _this = this;
                    this.joined = function (data) {
                        _this._match = new match_1.Match(data.room);
                        for (var id in data.users) {
                            if (data.users.hasOwnProperty(id)) {
                                var user = new user_1.User(id, data.users[id].name);
                                _this._match.addUser(user);
                            }
                        }
                    };
                    this.userJoined = function (data) {
                        var user = new user_1.User(data.id, data.name);
                        _this._match.addUser(user);
                    };
                    this.userLeft = function (data) {
                        _this._match.removeUser(data.id);
                    };
                    this.cardRevealed = function (data) {
                        var card = new card_1.Card(data.points);
                        _this._match.revealCard(data.userId, card);
                    };
                    this._socket = socket_service_1.SocketService.getInstance();
                    this._socket.on('joined', this.joined);
                    this._socket.on('user:joined', this.userJoined);
                    this._socket.on('user:left', this.userLeft);
                    this._socket.on('card:revealed', this.cardRevealed);
                }
                Object.defineProperty(MatchComponent.prototype, "groups", {
                    get: function () {
                        return this._match.groups;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MatchComponent.prototype, "users", {
                    get: function () {
                        return this._match.users;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MatchComponent.prototype, "room", {
                    get: function () {
                        return this._match.room;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MatchComponent.prototype, "current", {
                    get: function () {
                        return this._match.current;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MatchComponent.prototype, "connected", {
                    get: function () {
                        return !!this._match;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MatchComponent.prototype, "finished", {
                    get: function () {
                        return this._match.finished;
                    },
                    enumerable: true,
                    configurable: true
                });
                MatchComponent = __decorate([
                    core_1.Component({
                        selector: 'match',
                        templateUrl: './app/match/match.component.html',
                        styleUrls: [
                            './app/match/match.component.css'
                        ],
                        directives: [
                            group_component_1.GroupComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MatchComponent);
                return MatchComponent;
            }());
            exports_1("MatchComponent", MatchComponent);
        }
    }
});
//# sourceMappingURL=match.component.js.map