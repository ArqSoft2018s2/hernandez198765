"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _TransactionSchema = _interopRequireDefault(require("./TransactionSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardSchema = new _mongoose.default.Schema({
  number: Number,
  expirationDate: String,
  holderName: String,
  securityCode: String,
  balance: Number,
  transactions: [_TransactionSchema.default]
});

var _default = _mongoose.default.model('Cards', CardSchema);

exports.default = _default;