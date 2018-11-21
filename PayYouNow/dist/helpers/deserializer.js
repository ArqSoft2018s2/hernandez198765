"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var deserializer = function deserializer(transaction) {
  return {
    id: transaction.id
  };
};

var _default = deserializer;
exports.default = _default;