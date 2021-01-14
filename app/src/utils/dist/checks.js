"use strict";
exports.__esModule = true;
exports.isNotNil = exports.isNil = void 0;
// Whether a value is nil (null|undefined) or not
function isNil(ref) {
    return ref === null || ref === undefined;
}
exports.isNil = isNil;
// Whether a value is not nil (or not)
function isNotNil(ref) {
    return !isNil(ref);
}
exports.isNotNil = isNotNil;
