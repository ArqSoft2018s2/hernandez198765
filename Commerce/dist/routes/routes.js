"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CommerceController = _interopRequireDefault(require("../networking/controllers/CommerceController"));

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
    regeneratorRuntime.mark(function _callee(req, res) {
      var transaction, response, errorResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              transaction = req.body.transaction;
              _context.next = 4;
              return _CommerceController.default.sendTransaction(transaction);

            case 4:
              response = _context.sent;
              res.status(200).send("Transaction successful \n        Transaction Identifier: ".concat(response.data.id));
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              errorResponse = _context.t0.response ? _context.t0.response.data : _context.t0.message;
              res.status(500).send(errorResponse);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  app.delete('/Transaction/:id',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var id, errorResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return _CommerceController.default.deleteTransaction(id);

            case 4:
              res.status(200).send('Your purchase was returned succesfully');
              _context2.next = 11;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              errorResponse = _context2.t0.response ? _context2.t0.response.data : _context2.t0.message;
              res.status(500).send(errorResponse);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var _default = appRouter;
exports.default = _default;