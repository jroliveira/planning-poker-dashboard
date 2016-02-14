/* */ 
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = require('../Subscriber');
var tryCatch_1 = require('../util/tryCatch');
var errorObject_1 = require('../util/errorObject');
function _catch(selector) {
  var operator = new CatchOperator(selector);
  var caught = this.lift(operator);
  return (operator.caught = caught);
}
exports._catch = _catch;
var CatchOperator = (function() {
  function CatchOperator(selector) {
    this.selector = selector;
  }
  CatchOperator.prototype.call = function(subscriber) {
    return new CatchSubscriber(subscriber, this.selector, this.caught);
  };
  return CatchOperator;
})();
var CatchSubscriber = (function(_super) {
  __extends(CatchSubscriber, _super);
  function CatchSubscriber(destination, selector, caught) {
    _super.call(this, destination);
    this.selector = selector;
    this.caught = caught;
  }
  CatchSubscriber.prototype.error = function(err) {
    if (!this.isStopped) {
      var result = tryCatch_1.tryCatch(this.selector)(err, this.caught);
      if (result === errorObject_1.errorObject) {
        _super.prototype.error.call(this, errorObject_1.errorObject.e);
      } else {
        var destination = this.destination;
        this.unsubscribe();
        destination.remove(this);
        result.subscribe(this.destination);
      }
    }
  };
  return CatchSubscriber;
})(Subscriber_1.Subscriber);
