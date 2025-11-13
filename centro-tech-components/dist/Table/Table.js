"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _datatable = require("primereact/datatable");
var _column = require("primereact/column");
var _tag = require("primereact/tag");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var CentroTable = function CentroTable(_ref) {
  var dataSource = _ref.dataSource,
    data = _ref.data,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    _ref$allowPagination = _ref.allowPagination,
    allowPagination = _ref$allowPagination === void 0 ? true : _ref$allowPagination,
    _ref$enableFilters = _ref.enableFilters,
    enableFilters = _ref$enableFilters === void 0 ? false : _ref$enableFilters;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    tableData = _useState2[0],
    setTableData = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    filters = _useState6[0],
    setFilters = _useState6[1];

  // Fetch data from API or use provided data
  (0, _react.useEffect)(function () {
    if (!dataSource) {
      setTableData(data || []);
      return;
    }
    setLoading(true);
    fetch(dataSource).then(function (response) {
      return response.json();
    }).then(function (json) {
      return setTableData(json);
    })["catch"](function (err) {
      return console.error("Error fetching data:", err);
    })["finally"](function () {
      return setLoading(false);
    });
  }, [dataSource, data]);

  // Initialize filters for each column
  (0, _react.useEffect)(function () {
    if (!enableFilters) {
      if (Object.keys(filters).length !== 0) setFilters({});
      return;
    }
    if (columns.length && Object.keys(filters).length === 0) {
      var initFilters = {};
      columns.forEach(function (col) {
        initFilters[col.field] = {
          value: null,
          matchMode: "contains"
        };
      });
      setFilters(initFilters);
    }
  }, [columns, enableFilters, filters]);

  // Default
  var defaultBodyTemplate = function defaultBodyTemplate(rowData, field) {
    var value = rowData[field];
    if (_typeof(value) === "object" && value !== null) return JSON.stringify(value);
    return value;
  };

  // Render each column based on its configuration
  var renderColumn = function renderColumn(col, index) {
    var bodyTemplate = null;
    if (col.body) {
      bodyTemplate = function bodyTemplate(rowData) {
        var result = col.body(rowData);
        return typeof result === "function" ? /*#__PURE__*/_react["default"].createElement("result", null) : result;
      };
    } else if (col.type === "tag") {
      bodyTemplate = function bodyTemplate(rowData) {
        var _col$tagColors;
        var value = rowData[col.field];
        var color = ((_col$tagColors = col.tagColors) === null || _col$tagColors === void 0 ? void 0 : _col$tagColors[value]) || col.defaultColor || "info";
        return /*#__PURE__*/_react["default"].createElement(_tag.Tag, {
          value: value,
          severity: color
        });
      };
    } else {
      // Default: just show the text value
      bodyTemplate = function bodyTemplate(rowData) {
        return defaultBodyTemplate(rowData, col.field);
      };
    }
    return /*#__PURE__*/_react["default"].createElement(_column.Column, {
      key: col.field || index,
      field: col.field,
      header: col.header || col.field,
      sortable: col.sortable !== false,
      filter: enableFilters && col.filter !== false,
      style: col.style,
      body: bodyTemplate
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_datatable.DataTable, {
    value: tableData,
    loading: loading,
    paginator: allowPagination,
    rows: 10,
    emptyMessage: "No data found",
    filters: enableFilters ? filters : undefined,
    onFilter: enableFilters ? function (e) {
      return setFilters(e.filters);
    } : undefined,
    filterDisplay: enableFilters ? "row" : undefined
  }, columns.map(function (col, index) {
    return renderColumn(col, index);
  }));
};
CentroTable.propTypes = {
  // API endpoint to fetch data from
  dataSource: _propTypes["default"].string,
  // Or provide data directly as array
  data: _propTypes["default"].array,
  // Column definitions - array of column objects
  columns: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    field: _propTypes["default"].string.isRequired,
    header: _propTypes["default"].string,
    sortable: _propTypes["default"].bool,
    filter: _propTypes["default"].bool,
    style: _propTypes["default"].object,
    type: _propTypes["default"].oneOf(["text", "tag"]),
    tagColors: _propTypes["default"].object,
    defaultColor: _propTypes["default"].string,
    body: _propTypes["default"].func
  })).isRequired,
  allowPagination: _propTypes["default"].bool,
  enableFilters: _propTypes["default"].bool
};
var _default = exports["default"] = CentroTable;