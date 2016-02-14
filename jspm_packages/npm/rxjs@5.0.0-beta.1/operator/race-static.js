/* */ 
var fromArray_1 = require('../observable/fromArray');
var race_support_1 = require('./race-support');
var isArray_1 = require('../util/isArray');
function race() {
  var observables = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i - 0] = arguments[_i];
  }
  if (observables.length === 1) {
    if (isArray_1.isArray(observables[0])) {
      observables = observables[0];
    } else {
      return observables[0];
    }
  }
  return new fromArray_1.ArrayObservable(observables).lift(new race_support_1.RaceOperator());
}
exports.race = race;
