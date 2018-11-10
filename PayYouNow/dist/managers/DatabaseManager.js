"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _transactionSchema = _interopRequireDefault(require("../models/transactionSchema"));

var _serializer = _interopRequireDefault(require("../helpers/serializer"));

var _deserializer = _interopRequireDefault(require("../helpers/deserializer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DatabaseManager = function DatabaseManager() {
  _classCallCheck(this, DatabaseManager);

  _defineProperty(this, "connect",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mongoose.default.connect('mongodb://localhost:27017/payYouNow_db', {
              useNewUrlParser: true
            });

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.log('Cannot connect with Database');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 5]]);
  })));

  _defineProperty(this, "saveTransaction",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(gateway, network, transmitter) {
      var parsedTransaction, newTransaction, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              parsedTransaction = (0, _serializer.default)(gateway, network, transmitter);
              newTransaction = new _transactionSchema.default(parsedTransaction);
              _context2.next = 4;
              return newTransaction.save();

            case 4:
              response = _context2.sent;
              return _context2.abrupt("return", (0, _deserializer.default)(response));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getTransactionFromDatabase",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(transactionId) {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _transactionSchema.default.findById(transactionId).lean();

            case 2:
              response = _context3.sent;

              if (response) {
                _context3.next = 5;
                break;
              }

              throw new Error('Transaction doesnt exists');

            case 5:
              return _context3.abrupt("return", response);

            case 6:
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

  this.DB_CONNECTION = 'localhost:27017/payYouNow_db';
  _mongoose.default.Promise = global.Promise;
};

var _default = new DatabaseManager();

exports.default = _default;