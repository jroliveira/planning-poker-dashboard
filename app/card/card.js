System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Card;
    return {
        setters:[],
        execute: function() {
            Card = (function () {
                function Card(points) {
                    this._points = points;
                }
                Object.defineProperty(Card.prototype, "value", {
                    get: function () {
                        return this._points;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Card.prototype, "shown", {
                    get: function () {
                        return this._shown;
                    },
                    enumerable: true,
                    configurable: true
                });
                Card.prototype.show = function () {
                    this._shown = true;
                };
                return Card;
            }());
            exports_1("Card", Card);
        }
    }
});
//# sourceMappingURL=card.js.map