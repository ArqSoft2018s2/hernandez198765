"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import TransactionSchema from '../models/TransactionSchema';
var DatabaseManager = function DatabaseManager() {
  var _this = this;

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
            return _mongoose.default.connect("mongodb://".concat(_this.DB_CONNECTION), {
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

  _dotenv.default.config();

  this.DB_CONNECTION = process.env.DATABASE_IP;
  _mongoose.default.Promise = global.Promise;
} // sendNewTransaction = (transaction, callback) => {
//   const newTransaction = new TransactionSchema(transaction);
//   newTransaction.save((error, databaseResponse) => {
//     if (error) {
//       callback(500, 'Error');
//     } else {
//       callback(200, databaseResponse);
//     }
//   });
// };
;

var _default = new DatabaseManager();

exports.default = _default;