"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransactionSchema = new _mongoose.default.Schema({
  gatewayId: String,
  networkId: String,
  transmitterId: String,
  amount: Number
});

var _default = _mongoose.default.model('Transaction', TransactionSchema);

exports.default = _default;