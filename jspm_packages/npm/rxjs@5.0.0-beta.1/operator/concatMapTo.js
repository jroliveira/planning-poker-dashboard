/* */ 
var mergeMapTo_support_1 = require('./mergeMapTo-support');
function concatMapTo(observable, resultSelector) {
  return this.lift(new mergeMapTo_support_1.MergeMapToOperator(observable, resultSelector, 1));
}
exports.concatMapTo = concatMapTo;
