"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _DatabaseManager = _interopRequireDefault(require("../../managers/DatabaseManager"));

var _cardStatus = _interopRequireDefault(require("../../helpers/cardStatus"));

var _en = _interopRequireDefault(require("../../localization/en"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TransmitterController = function TransmitterController() {
  var _this = this;

  _classCallCheck(this, TransmitterController);

  _defineProperty(this, "addNewCard",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(newCard) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _DatabaseManager.default.addNewCard(newCard);

            case 3:
              _context.next = 8;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              throw new Error(_context.t0);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 5]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "chargeback",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(transaction) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.updateCardTransactions(transaction);

            case 2:
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

  _defineProperty(this, "addNewTransaction",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(transaction) {
      var transactionID;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _DatabaseManager.default.addCardTransactions(transaction);

            case 3:
              transactionID = _context3.sent;
              return _context3.abrupt("return", transactionID);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              throw new Error(_context3.t0);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 7]]);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "updateCardTransactions",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(transaction) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _DatabaseManager.default.updateCard(transaction, 'CHARGEBACK');

            case 3:
              _context4.next = 8;
              break;

            case 5:
              _context4.prev = 5;
              _context4.t0 = _context4["catch"](0);
              throw new Error(_context4.t0);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 5]]);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "updateCardBalance",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(card) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _DatabaseManager.default.updateCardBalance(card.number, -card.amount);

            case 3:
              _context5.next = 8;
              break;

            case 5:
              _context5.prev = 5;
              _context5.t0 = _context5["catch"](0);
              throw new Error(_context5.t0);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 5]]);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "validateCard",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(transactionCard) {
      var response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _DatabaseManager.default.validateCardIsEmitted(transactionCard);

            case 2:
              response = _context6.sent;

              _this.validateAmount(response, transactionCard.amount);

              _this.validateLuhn(transactionCard.number);

              _this.validateExpirationDate(transactionCard.expirationDate);

              _this.validateCardStatus(response.status);

              return _context6.abrupt("return", {
                number: transactionCard.number,
                data: _en.default.VALID_CARD,
                amount: transactionCard.amount
              });

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

  _defineProperty(this, "validateCardStatus", function (status) {
    if (status !== _cardStatus.default.ENABLED) {
      throw new Error("".concat(_en.default.CARD_STATUS_ERROR, " ").concat(status));
    }
  });

  _defineProperty(this, "validateExpirationDate", function (expirationDate) {
    var cardMonth = expirationDate.split('/')[0];
    var cardYear = expirationDate.split('/')[1];
    var actualMonth = (0, _moment.default)().month();
    var actualYear = (0, _moment.default)().year();

    if (cardYear > actualYear || cardYear === actualYear && cardMonth > actualMonth) {
      throw new Error(_en.default.EXPIRATION_DATE_ERROR);
    }
  });

  _defineProperty(this, "validateAmount", function (card, amount) {
    if (card.balance < amount) {
      throw new Error(_en.default.INSUFICIENT_FOUNDS);
    }
  });

  _defineProperty(this, "validateLuhn", function (cardNumber) {
    if (!_this.luhnValidation(cardNumber)) {
      throw new Error(_en.default.INVALID_CREDIT_CARD);
    }
  });

  _defineProperty(this, "luhnValidation", function (value) {
    var valueToWork = "".concat(value);
    if (/[^0-9-\s]+/.test(valueToWork)) return false;
    var nCheck = 0;
    var nDigit = 0;
    var bEven = false;
    valueToWork = valueToWork.replace(/\D/g, '');

    for (var n = valueToWork.length - 1; n >= 0; n -= 1) {
      var cDigit = valueToWork.charAt(n);
      nDigit = parseInt(cDigit, 10);

      if (bEven) {
        nDigit *= 2;
        if (nDigit > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 === 0;
  });

  _defineProperty(this, "returnPurchase",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(transactionId, cardNumber) {
      var amount;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _DatabaseManager.default.deleteCardTransactions(transactionId);

            case 2:
              amount = _context7.sent;
              _context7.next = 5;
              return _DatabaseManager.default.updateCardBalance(cardNumber, amount);

            case 5:
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

  this.BASE_API = '/Transmitter';
};

var _default = new TransmitterController();

exports.default = _default;