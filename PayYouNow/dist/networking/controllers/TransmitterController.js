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

var TransmitterController = function TransmitterController() {
  _classCallCheck(this, TransmitterController);

  _defineProperty(this, "communicateWithTransmitter",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req) {
      var uri, transmitterResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              uri = "".concat(_ApiConstants.default.TRANSMITTER_API, "/Transmitter");
              _context.next = 3;
              return _HttpService.default.post(uri, req.body);

            case 3:
              transmitterResponse = _context.sent;
              return _context.abrupt("return", transmitterResponse.data);

            case 5:
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
    regeneratorRuntime.mark(function _callee2(transactionId, transmitterTransactionId) {
      var uri, transmitterResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              uri = "".concat(_ApiConstants.default.TRANSMITTER_API, "/Transmitter/").concat(transactionId, "/").concat(transmitterTransactionId);
              _context2.next = 3;
              return _HttpService.default.delete(uri);

            case 3:
              transmitterResponse = _context2.sent;
              return _context2.abrupt("return", transmitterResponse.data);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "chargeback",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(transactionToChargeback) {
      var uri, transmitterResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              uri = "".concat(_ApiConstants.default.TRANSMITTER_API, "/Transmitter");
              _context3.next = 3;
              return _HttpService.default.put(uri, transactionToChargeback);

            case 3:
              transmitterResponse = _context3.sent;
              return _context3.abrupt("return", transmitterResponse.data);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }());
};

var _default = new TransmitterController();

exports.default = _default;