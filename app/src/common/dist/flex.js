"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.HorizontalCentered = exports.HorizontalStack = exports.VerticalGap = exports.MaybeHorizontalGap = exports.HorizontalGap = exports.Space = exports.VerticalStack = void 0;
var react_1 = require("react");
function VerticalStack(props) {
    var divStyle = props.style;
    var children = props.children;
    var style = __assign({ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }, divStyle);
    return react_1["default"].createElement("div", { style: style },
        " ",
        children,
        " ");
}
exports.VerticalStack = VerticalStack;
function Space() {
    var style = {
        flex: 1
    };
    return react_1["default"].createElement("div", { style: style });
}
exports.Space = Space;
/**
 * This adds some horizontal space. Usually more flexible than using padding.
 */
function HorizontalGap(props) {
    var style = { width: props.width };
    return (react_1["default"].createElement("div", { style: style }));
}
exports.HorizontalGap = HorizontalGap;
function MaybeHorizontalGap(props) {
    if (!props.isVisible) {
        return null;
    }
    return react_1["default"].createElement(HorizontalGap, { width: props.width });
}
exports.MaybeHorizontalGap = MaybeHorizontalGap;
/**
 * This adds some vertical space. Usually more flexible than using padding.
 */
function VerticalGap(props) {
    var style = {
        height: props.height
    };
    return react_1["default"].createElement("div", { style: style });
}
exports.VerticalGap = VerticalGap;
function HorizontalStack(props) {
    var divStyle = props.style, children = props.children, divProps = __rest(props, ["style", "children"]);
    var style = __assign({ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between' }, divStyle);
    return (react_1["default"].createElement("div", __assign({ style: style }, divProps), children));
}
exports.HorizontalStack = HorizontalStack;
function HorizontalCentered(props) {
    var divStyle = props.style, children = props.children, divProps = __rest(props, ["style", "children"]);
    var style = __assign({ justifyContent: 'center', alignItems: 'center' }, divStyle);
    return (react_1["default"].createElement(HorizontalStack, __assign({ style: style }, divProps), children));
}
exports.HorizontalCentered = HorizontalCentered;
