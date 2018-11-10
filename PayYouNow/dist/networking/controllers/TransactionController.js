"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GatewayController = _interopRequireDefault(require("./GatewayController"));

var _NetworkController = _interopRequireDefault(require("./NetworkController"));

var _TransmitterController = _interopRequireDefault(require("./TransmitterController"));

var _DatabaseManager = _interopRequireDefault(require("../../managers/DatabaseManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TransactionController = function TransactionController() {
  var _this = this;

  _classCallCheck(this, TransactionController);

  _defineProperty(this, "makeTransaction",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.makeCommunications(req, res);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "makeCommunications",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var networkResponse, transmitterResponse, transactionResponse, gatewayResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _GatewayController.default.communicateWithGateway(req, res);

            case 2:
              gatewayResponse = _context2.sent;
              _context2.prev = 3;
              _context2.next = 6;
              return _NetworkController.default.communicateWithNetwork(req, res);

            case 6:
              networkResponse = _context2.sent;
              _context2.next = 14;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](3);
              _context2.next = 13;
              return _this.rollbackGateway(gatewayResponse);

            case 13:
              throw new Error(_context2.t0.response.data);

            case 14:
              _context2.prev = 14;
              _context2.next = 17;
              return _TransmitterController.default.communicateWithTransmitter(req, res);

            case 17:
              transmitterResponse = _context2.sent;
              _context2.next = 27;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t1 = _context2["catch"](14);
              _context2.next = 24;
              return _this.rollbackGateway(gatewayResponse);

            case 24:
              _context2.next = 26;
              return _this.rollbackNetwork(networkResponse);

            case 26:
              throw new Error(_context2.t1.response.data);

            case 27:
              _context2.prev = 27;
              _context2.next = 30;
              return _DatabaseManager.default.saveTransaction(gatewayResponse, networkResponse, transmitterResponse);

            case 30:
              transactionResponse = _context2.sent;
              _context2.next = 42;
              break;

            case 33:
              _context2.prev = 33;
              _context2.t2 = _context2["catch"](27);
              _context2.next = 37;
              return _this.rollbackGateway(gatewayResponse.id);

            case 37:
              _context2.next = 39;
              return _this.rollbackNetwork(networkResponse.id);

            case 39:
              _context2.next = 41;
              return _this.rollbackTransmitter(transactionResponse.number);

            case 41:
              throw new Error(_context2.t2);

            case 42:
              return _context2.abrupt("return", transactionResponse);

            case 43:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 9], [14, 20], [27, 33]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "rollbackGateway",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(gatewayResponse) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _GatewayController.default.deleteTransaction(gatewayResponse);

            case 3:
              _context3.next = 8;
              break;

            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](0);
              throw new Error(_context3.t0.response.data);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 5]]);
    }));

    return function (_x5) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "rollbackNetwork",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(networkResponse) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _NetworkController.default.deleteTransaction(networkResponse);

            case 3:
              _context4.next = 8;
              break;

            case 5:
              _context4.prev = 5;
              _context4.t0 = _context4["catch"](0);
              throw new Error(_context4.t0.response.data);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 5]]);
    }));

    return function (_x6) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "rollbackTransmitter",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(transmitterResponse) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _TransmitterController.default.deleteTransaction(transmitterResponse);

            case 3:
              _context5.next = 8;
              break;

            case 5:
              _context5.prev = 5;
              _context5.t0 = _context5["catch"](0);
              throw new Error(_context5.t0.response.data);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 5]]);
    }));

    return function (_x7) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "returnPurchase",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(transactionId) {
      var transaction;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _DatabaseManager.default.getTransactionFromDatabase(transactionId);

            case 3:
              transaction = _context6.sent;
              _context6.next = 6;
              return _TransmitterController.default.deleteTransaction(transaction.transmitterId, transaction.transmitterTransactionId);

            case 6:
              _context6.next = 8;
              return _NetworkController.default.deleteTransaction(transaction.networkId);

            case 8:
              _context6.next = 10;
              return _GatewayController.default.deleteTransaction(transaction.gatewayId);

            case 10:
              _context6.next = 15;
              break;

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](0);
              throw new Error(_context6.t0.response.data);

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[0, 12]]);
    }));

    return function (_x8) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "chargeback",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(transactionToChargeback) {
      var response;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _TransmitterController.default.chargeback(transactionToChargeback);

            case 3:
              response = _context7.sent;
              return _context7.abrupt("return", response);

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              throw new Error(_context7.t0.response.data);

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this, [[0, 7]]);
    }));

    return function (_x9) {
      return _ref7.apply(this, arguments);
    };
  }());

  this.paymentResponse = "Commerce starts communication";
};

var _default = new TransactionController();

exports.default = _default;