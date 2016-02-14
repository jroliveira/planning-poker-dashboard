/* */ 
var mergeMap_support_1 = require('./mergeMap-support');
function concatMap(project, resultSelector) {
  return this.lift(new mergeMap_support_1.MergeMapOperator(project, resultSelector, 1));
}
exports.concatMap = concatMap;
