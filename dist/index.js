"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _exenv = _interopRequireDefault(require("exenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isClientSide = _exenv["default"].canUseDOM;

var withoutHydrateServerSide = function withoutHydrateServerSide(Component) {
  return function (props) {
    return _react["default"].createElement("section", {
      "data-no-hydrate": true
    }, _react["default"].createElement(Component, props));
  };
};

var withoutHydrateClientSide = function withoutHydrateClientSide(_ref) {
  var _ref$onUpdate = _ref.onUpdate,
      onUpdate = _ref$onUpdate === void 0 ? null : _ref$onUpdate,
      _ref$disableFallback = _ref.disableFallback,
      disableFallback = _ref$disableFallback === void 0 ? false : _ref$disableFallback;
  return function (Component) {
    return function (props) {
      var rootRef = (0, _react.useRef)(null);

      var _useState = (0, _react.useState)(undefined),
          _useState2 = _slicedToArray(_useState, 2),
          wasRenderedServerSide = _useState2[0],
          setWasRenderedServerSide = _useState2[1];

      (0, _react.useLayoutEffect)(function () {
        setWasRenderedServerSide(!!rootRef.current.getAttribute("data-no-hydrate"));
      }, [rootRef]);
      (0, _react.useLayoutEffect)(function () {
        if (!wasRenderedServerSide || !onUpdate) return;
        onUpdate(props, rootRef.current);
      });
      if (isClientSide && (wasRenderedServerSide === undefined || wasRenderedServerSide || disableFallback)) return _react["default"].createElement("section", {
        ref: rootRef,
        dangerouslySetInnerHTML: {
          __html: ""
        },
        suppressHydrationWarning: true
      });
      return _react["default"].createElement(Component, props);
    };
  };
};

var withoutHydrate = function withoutHydrate() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (isClientSide) return withoutHydrateClientSide(options);
  return withoutHydrateServerSide;
};

var _default = withoutHydrate;
exports["default"] = _default;
