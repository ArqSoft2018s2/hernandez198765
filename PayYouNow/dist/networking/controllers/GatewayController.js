"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HttpService = _interopRequireDefault(require("../HttpService"));

var _ApiConstants = _interopRequireDefault(require("../../helpers/ApiConstants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GatewayController = function GatewayController() {
  var _this = this;

  _classCallCheck(this, GatewayController);

  _defineProperty(this, "communicateWithGateway",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req) {
      var gatewayToCommunicate, url, gatewayResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              gatewayToCommunicate = _this.obtainGateway(req.body);
              console.log(gatewayToCommunicate);
              url = "".concat(_ApiConstants.default.GATEWAY_API, "/Gateway");
              _context.next = 5;
              return _HttpService.default.post(url, req.body);

            case 5:
              gatewayResponse = _context.sent;
              return _context.abrupt("return", gatewayResponse.data);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
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
      var url, gatewayResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = "".concat(_ApiConstants.default.GATEWAY_API, "/Gateway/").concat(transactionId);
              _context2.next = 3;
              return _HttpService.default.delete(url);

            case 3:
              gatewayResponse = _context2.sent;
              return _context2.abrupt("return", gatewayResponse.data);

            case 5:
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

  _defineProperty(this, "obtainGateway", function (transaction) {
    if (!transaction.gateway) return 'No gateway specified'; // TODO: go to database and get gateway route, etc..

    return transaction.gateway;
  });
};

var _default = new GatewayController();

exports.default = _default;