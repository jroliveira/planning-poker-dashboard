/* */ 
var race_static_1 = require('./race-static');
var isArray_1 = require('../util/isArray');
function race() {
  var observables = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    observables[_i - 0] = arguments[_i];
  }
  if (observables.length === 1 && isArray_1.isArray(observables[0])) {
    observables = observables[0];
  }
  observables.unshift(this);
  return race_static_1.race.apply(this, observables);
}
exports.race = race;
