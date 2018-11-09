"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _CardSchema = _interopRequireDefault(require("../models/CardSchema"));

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
            return _mongoose.default.connect('mongodb://localhost:27017/transmitter_db', {
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

  _defineProperty(this, "addNewCard",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(newCard) {
      var newTransaction;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              newTransaction = new _CardSchema.default(newCard);
              _context2.next = 3;
              return newTransaction.save(function (error) {
                if (error) {
                  throw new Error('Error in the database');
                }
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "validateCardIsEmitted",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(card) {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _CardSchema.default.findOne({
                number: card.number,
                holderName: card.holderName,
                securityCode: card.securityCode
              }).lean();

            case 2:
              response = _context3.sent;

              if (response) {
                _context3.next = 5;
                break;
              }

              throw new Error('Card not emitted by Transmitter');

            case 5:
              return _context3.abrupt("return", response);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "addCardTransactions",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(transaction) {
      var newTransaction, newCard;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              newTransaction = {
                amount: transaction.amount,
                date: transaction.date,
                status: 'OK'
              };

              _CardSchema.default.transactions.push(newTransaction);

              _context4.next = 4;
              return _CardSchema.default.save();

            case 4:
              newCard = _context4.sent;
              console.log(newCard);
              return _context4.abrupt("return", newCard.transactions[newCard.transactions.length].id);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "updateCardTransactions",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(transactionId, status) {
      var transaction;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _CardSchema.default.transactions.id(transactionId);

            case 2:
              transaction = _context5.sent;
              transaction.status = status;
              _context5.next = 6;
              return _CardSchema.default.save();

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "deleteCardTransactions",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(transactionId) {
      var amount, removed;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _CardSchema.default.transactions.id(transactionId).amount;

            case 2:
              amount = _context6.sent;
              _context6.next = 5;
              return _CardSchema.default.transactions.id(transactionId).remove();

            case 5:
              removed = _context6.sent;
              console.log(removed);
              return _context6.abrupt("return", amount);

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "updateCardBalance",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(transactionId, amount) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _CardSchema.default.update({
                number: transactionId
              }, {
                $inc: {
                  balance: amount
                }
              });

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function (_x7, _x8) {
      return _ref7.apply(this, arguments);
    };
  }());

  this.DB_CONNECTION = 'localhost:27017/transmitter_db';
  _mongoose.default.Promise = global.Promise;
};

var _default = new DatabaseManager();

exports.default = _default;