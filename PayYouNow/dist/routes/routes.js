"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TransactionController = _interopRequireDefault(require("../networking/controllers/TransactionController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var appRouter = function appRouter(app) {
  app.get('/', function (req, res) {
    res.status(200).send('Welcome to our restful API');
  });
  app.post('/Transaction',
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var response, errorResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _TransactionController.default.makeCommunications(req, res, next);

            case 3:
              response = _context.sent;
              res.status(200).send(response);
              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              errorResponse = _context.t0.response ? _context.t0.response.data : _context.t0.message;
              res.status(500).send(errorResponse);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 7]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  app.delete('/Transaction/:transactionId',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var transactionId, response, errorResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              transactionId = req.params.transactionId;
              _context2.next = 4;
              return _TransactionController.default.returnPurchase(transactionId);

            case 4:
              response = _context2.sent;
              res.status(200).send(response);
              _context2.next = 12;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              errorResponse = _context2.t0.response ? _context2.t0.response.data : _context2.t0.message;
              res.status(500).send(errorResponse);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 8]]);
    }));

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }());
  app.put('/Transaction',
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var transactionToChargeback, response, errorResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              transactionToChargeback = req.body;
              _context3.next = 4;
              return _TransactionController.default.chargeback(transactionToChargeback);

            case 4:
              response = _context3.sent;
              res.status(200).send(response);
              _context3.next = 12;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              errorResponse = _context3.t0.response ? _context3.t0.response.data : _context3.t0.message;
              res.status(500).send(errorResponse);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 8]]);
    }));

    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }());
};

var _default = appRouter;
exports.default = _default;