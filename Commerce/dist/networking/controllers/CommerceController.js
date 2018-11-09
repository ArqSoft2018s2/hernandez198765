"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HttpService = _interopRequireDefault(require("../HttpService"));

var _Gateways = _interopRequireDefault(require("../../helpers/Gateways"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TransactionController = function TransactionController() {
  var _this = this;

  _classCallCheck(this, TransactionController);

  _defineProperty(this, "getTransaction", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _HttpService.default.get(_this.BASE_API, params);
  });

  _defineProperty(this, "getGatewayFromCategory", function (transaction) {
    var category = transaction.product.category;
    return _objectSpread({}, transaction, {
      gateway: _this.findGateway(category)
    });
  });

  _defineProperty(this, "findGateway", function (category) {
    if (_Gateways.default[category]) {
      return _Gateways.default[category];
    }

    throw new Error('Error: We cant find a gateway to process this product');
  });

  _defineProperty(this, "sendTransaction",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(newTransaction) {
      var transactionWithGateway, response, message;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              transactionWithGateway = _this.getGatewayFromCategory(newTransaction);
              _context.next = 4;
              return _HttpService.default.post(_this.BASE_API, transactionWithGateway);

            case 4:
              response = _context.sent;
              return _context.abrupt("return", response);

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              message = _context.t0.response ? _context.t0.response.data : _context.t0.message;
              throw new Error(message);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 8]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "deleteTransaction",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(transactionId) {
      var uri;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              uri = "".concat(_this.BASE_API, "/").concat(transactionId);
              _context2.next = 3;
              return _HttpService.default.delete(uri);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "patchTransaction", function (uri, body) {
    return _HttpService.default.patch(uri, body);
  });

  this.BASE_API = '/Transaction';
};

var _default = new TransactionController();

exports.default = _default;