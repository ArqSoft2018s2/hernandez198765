"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TransmitterController = _interopRequireDefault(require("../networking/controllers/TransmitterController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var appRouter = function appRouter(app) {
  app.post('/Card',
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var newCard;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              newCard = req.body;
              _context.next = 4;
              return _TransmitterController.default.addNewCard(newCard);

            case 4:
              res.status(200).send('Add new card succesfully');
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              res.status(500).send(_context.t0.message);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()); // TODO: Change about keeping the card number, we can find the balance only with the transaction id.
  // need to test it.

  app.post('/Transmitter',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var card, validationResponse, transactionId;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              card = req.body.card;
              _context2.next = 4;
              return _TransmitterController.default.validateCard(card);

            case 4:
              validationResponse = _context2.sent;
              _context2.next = 7;
              return _TransmitterController.default.updateCardTransactions(req.body);

            case 7:
              transactionId = _context2.sent;
              _context2.next = 10;
              return _TransmitterController.default.updateCardBalance(req.body);

            case 10:
              res.status(200).send(_objectSpread({}, validationResponse, {
                id: transactionId
              }));
              _context2.next = 16;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              res.status(500).send(_context2.t0.message);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 13]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()); // TODO: With the changes of only find the card by the transaction id
  // ill only need one parameter.

  app.delete('/Transmitter/:transactionId/:transmitterTransactionID',
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var _req$params, transmitterTransactionID, transactionId;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$params = req.params, transmitterTransactionID = _req$params.transmitterTransactionID, transactionId = _req$params.transactionId;
              _context3.next = 4;
              return _TransmitterController.default.returnPurchase(transactionId, transmitterTransactionID);

            case 4:
              res.status(200).send('Transaction returned');
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              res.status(500).send(_context3.t0.message);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 7]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  app.put('/Transmitter',
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var transactionId;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              transactionId = req.body;
              _context4.next = 4;
              return _TransmitterController.default.chargebackPurchase(transactionId);

            case 4:
              res.status(200).send('Chargeback transaction');
              _context4.next = 10;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              res.status(500).send(_context4.t0.message);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 7]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};

var _default = appRouter;
exports.default = _default;