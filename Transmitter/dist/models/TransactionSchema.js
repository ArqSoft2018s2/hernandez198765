"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransactionSchema = new _mongoose.default.Schema({
  amount: Number,
  date: Number,
  status: String
});
var _default = TransactionSchema;
exports.default = _default;