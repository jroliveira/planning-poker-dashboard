System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SocketService;
    return {
        setters:[],
        execute: function() {
            SocketService = (function () {
                function SocketService() {
                    if (!SocketService.isCreating) {
                        throw new Error("You can't call new in Singleton instances!");
                    }
                    this._socket = io.connect('https://scrum-poker-api.herokuapp.com/');
                }
                Object.defineProperty(SocketService.prototype, "socket", {
                    get: function () {
                        return this._socket;
                    },
                    enumerable: true,
                    configurable: true
                });
                SocketService.getInstance = function () {
                    if (SocketService.instance == null) {
                        SocketService.isCreating = true;
                        SocketService.instance = new SocketService();
                        SocketService.isCreating = false;
                    }
                    return SocketService.instance._socket;
                };
                SocketService.isCreating = false;
                return SocketService;
            }());
            exports_1("SocketService", SocketService);
        }
    }
});
//# sourceMappingURL=socket-service.js.map