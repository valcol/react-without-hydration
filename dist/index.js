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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var isClientSide = _exenv["default"].canUseDOM;

var getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

var withoutHydrationServerSide = function withoutHydrationServerSide(WrappedComponent) {
  return function (props) {
    return _react["default"].createElement("section", {
      "data-no-hydrate": true
    }, _react["default"].createElement(WrappedComponent, props));
  };
};

var withoutHydrationClientSide = function withoutHydrationClientSide(_ref) {
  var _ref$onUpdate = _ref.onUpdate,
      onUpdate = _ref$onUpdate === void 0 ? null : _ref$onUpdate,
      _ref$disableFallback = _ref.disableFallback,
      disableFallback = _ref$disableFallback === void 0 ? false : _ref$disableFallback;
  return function (WrappedComponent) {
    var WithoutHydration = function WithoutHydration(_ref2) {
      var _ref2$forceHydration = _ref2.forceHydration,
          forceHydration = _ref2$forceHydration === void 0 ? false : _ref2$forceHydration,
          props = _objectWithoutProperties(_ref2, ["forceHydration"]);

      var rootRef = (0, _react.useRef)(null);

      var _useState = (0, _react.useState)(undefined),
          _useState2 = _slicedToArray(_useState, 2),
          shouldHydrate = _useState2[0],
          setShouldHydrate = _useState2[1];

      (0, _react.useLayoutEffect)(function () {
        if (shouldHydrate) return;
        var wasRenderedServerSide = !!rootRef.current.getAttribute("data-no-hydrate");
        setShouldHydrate(!wasRenderedServerSide && !disableFallback || forceHydration);
      });
      (0, _react.useLayoutEffect)(function () {
        if (shouldHydrate || shouldHydrate === undefined || !onUpdate) return;
        onUpdate(props, rootRef.current);
      });
      if (!shouldHydrate) return _react["default"].createElement("section", {
        ref: rootRef,
        dangerouslySetInnerHTML: {
          __html: ""
        },
        suppressHydrationWarning: true
      });
      return _react["default"].createElement(WrappedComponent, props);
    };

    WithoutHydration.displayName = "WithoutHydration(".concat(getDisplayName(WrappedComponent), ")");
    return WithoutHydration;
  };
};

var withoutHydration = function withoutHydration() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (isClientSide) return withoutHydrationClientSide(options);
  return withoutHydrationServerSide;
};

var _default = withoutHydration;
exports["default"] = _default;
